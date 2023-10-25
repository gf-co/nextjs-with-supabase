// @ts-nocheck
// @note - https://supabase.com/docs/guides/functions/local-development

// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { Database } from "@/lib/database.types.js";
// import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

// Reference: https://github.com/supabase/supabase/blob/master/examples/edge-functions/supabase/functions/restful-tasks/index.ts
async function getTasks(supabaseClient: SupabaseClient, userId: string) {
  const { data, error } = await supabaseClient
    .from("tasks")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
}

async function addTask(
  supabaseClient: SupabaseClient,
  taskInsertParams: Database["public"]["Tables"]["tasks"]["Insert"],
) {
  const { data, error } = await supabaseClient
    .from("tasks")
    .insert(taskInsertParams)
    .select()
    .single();

  if (error) throw error;

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
}

async function updateTask(
  supabaseClient: SupabaseClient,
  taskUpdateParams: Database["public"]["Tables"]["tasks"]["Update"],
) {
  const { error } = await supabaseClient
    .from("tasks")
    .update(taskUpdateParams)
    .eq("id", taskUpdateParams.id);

  if (error) throw error;

  return new Response(JSON.stringify(taskUpdateParams), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
}

async function deleteTask(supabaseClient: SupabaseClient, taskId: string) {
  const { error } = await supabaseClient
    .from("tasks")
    .delete()
    .eq("id", taskId);

  if (error) throw error;

  return new Response(JSON.stringify({}), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
}

Deno.serve(async (req) => {
  // Reference: https://supabase.com/docs/guides/functions/cors
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get("SUPABASE_URL") ?? "",
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    const {
      data: { user },
      error,
    } = await supabaseClient.auth.getUser();

    if (error) throw error;

    if (!user) throw error;

    let body = null;

    if (
      req.method === "PUT" ||
      req.method === "DELETE" ||
      req.method === "POST"
    ) {
      body = await req.json();
    }

    // call relevant method based on method and id
    switch (true) {
      case req.method === "PUT":
        return updateTask(supabaseClient, body);
      case req.method === "DELETE":
        return deleteTask(supabaseClient, body.id as string);
      case req.method === "POST":
        return addTask(supabaseClient, body);
      case req.method === "GET":
        return getTasks(supabaseClient, user.id);
      default:
        return getTasks(supabaseClient, user.id);
    }
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
// --------------------------------------------
// curl --request POST 'https://<project_ref>.supabase.co/functions/v1/hello-world' \
//   --header 'Authorization: Bearer ANON_KEY' \
//   --header 'Content-Type: application/json' \
//   --data '{ "name":"Functions" }'
