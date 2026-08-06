# <Project name>

<!-- why: one line on what the project is and what its product actually is. The
     agent can read the code to learn the first; only you can tell it the second,
     and the second is what it optimizes for when a tradeoff appears. -->

<One sentence: what this is.> <One sentence: what counts as the product here,
for example "a public demo and a readable repo", or "throughput under load".>

## Commands

<!-- why: an agent that does not find the command invents one, and an invented
     command fails silently or runs the wrong scope. Cheapest block in the file. -->

- `<test command>`: run the test suite. Always after touching `<core module>`.
- `<single test command>`: one test file.
- `<dev command>`: run locally.
- `<build command>`: full build.

## Architecture invariants

<!-- why: the most expensive block to write and the one that pays. Every line is
     a boundary the agent cannot deduce by reading the code, because the code
     shows what is, not what must never happen. -->

- `<core module>` is pure `<language>`: no imports of `<framework>`, `<runtime>`
  APIs, or any platform dependency. It must stay consumable from a future
  `<other consumer>`.
  <!-- why: an invariant stated as an instruction is probabilistic. When this one
       gets broken twice, move it down to structure: a tsconfig with `types: []`,
       a lint boundary rule, a package with no such dependency to import. -->
- All `<domain>` logic lives in `<core module>`. The `<peripheral layer>` never
  decides, validates or computes: it presents.
- Secrets exist only on the server. Never in client code, never in a
  client-exposed environment variable.
- Anything the client claims is re-verified on the server before it is acted on.
- Uniform evidence contract: every type of claim a prompt may demand must exist
  in the payload of every case, not of some. Where the payload is silent, the
  model fills the gap by inventing. Patching this case by case is whack-a-mole.
  <!-- why: this one is not about prompts, it is about who owns the facts. The
       code computes them, the model writes them up. Keep it here because it is
       the invariant a future session is most likely to "simplify" away. -->

## Conventions

<!-- why: rules that are invisible until they are broken, and then expensive to
     unbreak across a diff. Cheap to state once, here. -->

- `<language>` strict. No `any`: use `unknown` and narrowing.
- User-facing strings centralized in `<copy module>`. No hardcoded strings in
  components.
- `<domain notation>` everywhere: code, tests, and prompts.
- New `<unit of work>` starts with a fixture and its test, implementation after.
- Conventional Commits (feat/fix/test/docs/chore/refactor + scope), message in
  English, imperative, title 72 characters or less. Body only when the why is
  not obvious from the diff.

## Product decisions

<!-- why: a decision the harness never references gets re-asked. Not an agent
     failure, a discoverability failure: one decision, one home, and the home is
     wherever its reader already looks. -->

- Product and design decisions live in `docs/DESIGN.md`. Consult it before
  asking. An invariant and its sanctioned exception belong in the same place, or
  a future session will "fix" the exception back.

## Task closure

<!-- why: a done written before the work turns "I think it works" into something
     checkable, and denies the agent the option of declaring victory. -->

- Nothing is finished without `<test command>` and `<build command>` green.
