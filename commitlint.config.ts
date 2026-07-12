import { RuleConfigSeverity } from "@commitlint/types";
import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  formatter: "@commitlint/format",
  rules: {
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      ["build", "chore", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"],
    ],
    "type-case": [RuleConfigSeverity.Error, "always", "lower-case"],
    "type-empty": [RuleConfigSeverity.Error, "never"],
    "scope-case": [RuleConfigSeverity.Error, "always", "lower-case"],
    "subject-empty": [RuleConfigSeverity.Error, "never"],
    "subject-full-stop": [RuleConfigSeverity.Error, "never", "."],
    "header-max-length": [RuleConfigSeverity.Error, "always", 100],
    "body-leading-blank": [RuleConfigSeverity.Warning, "always"],
    "footer-leading-blank": [RuleConfigSeverity.Warning, "always"],
  },
};

export default Configuration;
