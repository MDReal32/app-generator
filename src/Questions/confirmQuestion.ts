import { prompt } from "inquirer";
import { Questions } from "../typescript/enums";

export const confirmQuestion = async (
  question: Questions,
  answer1: string = "Yes",
  answer2: string = "No",
  trueAnswer: string = answer1
): Promise<boolean> => {
  if ([answer1, answer2].indexOf(trueAnswer) === -1) return false;

  const answer: Record<string, string> = await prompt({
    name: "key",
    message: question,
    type: "list",
    choices: [answer1, answer2]
  });

  return answer.key === trueAnswer;
};
