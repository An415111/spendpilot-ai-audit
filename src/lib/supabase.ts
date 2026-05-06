import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://irgbnaxzihhxbkihshzo.supabase.co";

const supabaseKey =
  "sb_publishable_5hw8tA-Fcdr79zGevpqpsw_-ShBv9fW";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);