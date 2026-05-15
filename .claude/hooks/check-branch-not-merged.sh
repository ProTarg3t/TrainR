#!/usr/bin/env bash
# Block `git push` when the current branch is already merged into main.
# Prevents orphaned commits on closed feature branches (PR #29 / PR #34 incident — see CLAUDE.md).

set -u

input=$(cat)
command=$(printf '%s' "$input" | jq -r '.tool_input.command // empty' 2>/dev/null)

# Only act on commands that contain `git push`
case "$command" in
  *"git push") ;;
  *"git push "*) ;;
  *) exit 0 ;;
esac

branch=$(git branch --show-current 2>/dev/null)
[ -z "$branch" ] && exit 0
[ "$branch" = "main" ] && exit 0

git fetch origin main --quiet 2>/dev/null || exit 0

# GitHub merge commits look like:
#   "Merge pull request #34 from ProTarg3t/claude/training-quickstarts-2025-S3qfh"
# Match merge commits whose subject ends in "from [<owner>/]<branch>".
merged=$(git log origin/main --merges --pretty=format:'%H %s' 2>/dev/null \
  | grep -E "from ([^ ]+/)?${branch}\$" \
  | head -n 1)

if [ -n "$merged" ]; then
  sha=$(printf '%s' "$merged" | cut -c1-7)
  cat >&2 <<EOF
BLOCKED: branch '${branch}' is already merged into main (merge commit ${sha}).

Pushing to an already-merged feature branch creates orphaned commits
without a PR — the "PR #29 / PR #34 incident" in CLAUDE.md.

Fix:
  git checkout main && git pull origin main
  git checkout -b <new-branch-name>
  git cherry-pick <commits>          # if you need work from this branch
  git push -u origin <new-branch-name>
EOF
  exit 2
fi

exit 0
