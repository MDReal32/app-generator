import { prompt } from "inquirer";
import { Questions } from "../typescript/enums";

export const listQuestion = async <T extends any>(
  question: Questions,
  ...choices: (string | number)[]
): Promise<T> => {
  const answer: Record<string, T> = await prompt({
    name: "key",
    message: question,
    type: "list",
    choices: choices.map(choose => choose.toString())
  });

  return answer["key"];
};
