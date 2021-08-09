import { prompt } from "inquirer";
import { Questions } from "../typescript/enums";

export const question = async (question: Questions, _default: string): Promise<string> => {
  const answer = await prompt({
    name: "key",
    message: question,
    type: "input",
    default: _default,
    validate(input: string): boolean | string | Promise<boolean | string> {
      return !!input;
    }
  });

  return answer.key;
};
