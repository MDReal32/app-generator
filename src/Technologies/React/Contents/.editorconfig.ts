import { IConfig } from "../../../config";

export const getContent = (config: IConfig) => {
  return `root = true

[*]
charset = utf-8
indent_size = 2
indent_style = space
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true
max_line_length = 100

[*.md]
trim_trailing_whitespace = false

[{package.json,*.yml,*.yaml}]
indent_size = 2
indent_style = space
`;
};
