import  zod  from "zod";

const StringZodSchema = zod.string(); // Runtime variable
type StringZodType = zod.infer<typeof StringZodSchema>; // Compiletime variable