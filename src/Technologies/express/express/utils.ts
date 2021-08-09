import { CommandBuilder } from "../../../Builder/CommandBuilder";
import { CSSPreProcessors, Engines } from "../../../typescript/enums";

export const buildEngine = (engine: Engines, builder: CommandBuilder): void => {
  if (engine === Engines.Hogan || engine === Engines.NoView) {
    builder.addOption(engine);
  } else {
    builder.addOption("view", engine);
  }
};

export const buildCSSEngine = (cssEngine: CSSPreProcessors, builder: CommandBuilder): void => {
  if (cssEngine === CSSPreProcessors.Plain) return;
  builder.addOption("css", cssEngine);
};
