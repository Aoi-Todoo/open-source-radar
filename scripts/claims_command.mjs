// Shared matcher for the self-serve /claim and /unclaim commands.
//
// The command can sit on any line ("hi, I'd like this one\n/claim"), but not
// inside a quote. Kept in one place so the claims workflow and its test always
// exercise the same code.
export const findCommand = (text) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.startsWith("/claim") || line.startsWith("/unclaim"));

export const isStale = (times, now, days) => Math.max(0, ...times) <= now - days * 86400e3;
