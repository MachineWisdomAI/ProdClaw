import { describe, it, expect } from "vitest";
import { WhatsAppConfigSchema } from "./zod-schema.providers-whatsapp.js";

// Note: the upstream version of this test file also covers `systemPrompt`
// validation across groups/direct/accounts surfaces. Those tests were
// dropped from this cherry-pick because `systemPrompt` is a post-baseline
// WhatsApp config feature not present at v2026.4.20. The actual fix shipped
// by cherry-pick 3c9437ae54 is the deprecated-key handling for
// `exposeErrorText`, exercised below.
describe("WhatsApp deprecated exposeErrorText handling (cherry-pick 3c9437ae54)", () => {
  it("accepts deprecated exposeErrorText as a no-op compatibility key", () => {
    const result = WhatsAppConfigSchema.safeParse({
      exposeErrorText: false,
      accounts: {
        work: {
          exposeErrorText: true,
        },
      },
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(Object.hasOwn(result.data, "exposeErrorText")).toBe(false);
      expect(Object.hasOwn(result.data.accounts?.work ?? {}, "exposeErrorText")).toBe(false);
    }
  });

  it("keeps deprecated exposeErrorText out of generated config surfaces", () => {
    const schema = WhatsAppConfigSchema.toJSONSchema({
      target: "draft-07",
      unrepresentable: "any",
    }) as {
      properties?: {
        exposeErrorText?: unknown;
        accounts?: {
          additionalProperties?: {
            properties?: {
              exposeErrorText?: unknown;
            };
          };
        };
      };
    };

    expect(schema.properties?.exposeErrorText).toBeUndefined();
    expect(schema.properties?.accounts?.additionalProperties?.properties?.exposeErrorText).toBe(
      undefined,
    );
  });
});
