import * as fs from "fs";
import * as path from "path";
import {
  createLanguageModel,
  createJsonTranslator,
} from "typechat";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let translator:any;
export function initTranslator() {
  const model = createLanguageModel(process.env);
  const TodoSchema = fs.readFileSync(
    path.resolve(__dirname, "../src/todo.schema.ts"),
    "utf-8"
  );
  translator = createJsonTranslator(model, TodoSchema, "TodoSchema");
}

export async function translate(message: string, todoS: string) {
  const prompt = `${message}。
	(
   1. 请基于下面已有的 todoS 列表返回正确的 todo id, 如果找不到符合要求的 todo id 的话 那么 id 是 ""
	todoS: ${todoS}
   
  )
	括号里面的内容不要生成到 json 里面
	`;
  try {
    const result = await translator.translate(prompt);
    if (result.success) {
      return result.data;
    } else {
      console.error("出错啦 可能是用户胡说八道  LLM 理解不了");
    }
  } catch (error) {
    console.log(error);
  }
}
