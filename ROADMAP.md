# ROADMAP: <Project name>

Build plan by phases, and the engineering log.

The shape of every step, without exception: (1) plan first and wait for the OK,
(2) build, (3) summary of what changed, (4) verify against a done criterion
written **before** starting, (5) log the entry if the step earned one,
(6) commit. Small steps, frequent commits, and no moving to the next phase with
the previous done in red.

Checked boxes are the record of closed work. They are not reopened by editing
this file: see `.claude/hooks/protect-roadmap.mjs`.

## Phase 1: <name of the phase>

- [ ] 1.1 <What gets built, in one or two lines. Name the files or the module if
      the step is ambiguous without them.>
      Done: <the observable criterion, written before starting. A command that
      passes, a behaviour a third party can check, a number that was measured.>
- [ ] 1.2 <Second step. If its done depends on code from a later phase, the step
      is wrong: split it in two, and say here where the second half lives.>
      Done: <criterion>

## Log

Working diary of the project: what was decided, why, what was measured before
deciding it, and what went wrong. Written as it happens, not afterwards, so it
includes the dead ends and the times the plan was wrong.

Format of every entry: **what happened, why it was resolved that way, and the
rule that remains or the signal to watch**.

An entry is written when the step made a design decision with a why, deviated
from the plan, hit friction in the harness, or measured something that changed
the criterion. A step that was plain execution gets no entry: this log records
decisions and friction, not activity.

### <Phase or topic>

- <YYYY-MM-DD> (1.2): <what happened>. <Why it was resolved that way, including
  what was measured or tried first.> Rule that remains: <the invariant this
  bought>. Signal to watch: <what would reopen the decision>.
