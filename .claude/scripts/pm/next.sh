#!/bin/bash
echo "Getting status..."
echo ""
echo ""

echo "📋 Next Available Tasks"
echo "======================="
echo ""

# Find tasks that are pending and have no dependencies or whose dependencies are completed
found=0

for epic_dir in .claude/epics/*/; do
  [ -d "$epic_dir" ] || continue
  epic_name=$(basename "$epic_dir")

  for task_file in "$epic_dir"[0-9]*.md; do
    [ -f "$task_file" ] || continue

    # Check if task is pending
    status=$(grep "^status:" "$task_file" | head -1 | sed 's/^status: *//' | tr -d '"')
    [ "$status" != "pending" ] && [ -n "$status" ] && continue

    # Check dependencies
    deps=$(grep "^depends_on:" "$task_file" | head -1 | sed 's/^depends_on: *\[//' | sed 's/\]//')

    # If no dependencies or empty, task is available
    if [ -z "$deps" ] || [ "$deps" = "depends_on:" ]; then
      task_name=$(grep "^title:" "$task_file" | head -1 | sed 's/^title: *//' | tr -d '"')
      task_num=$(basename "$task_file" .md)
      parallel=$(grep "^parallel:" "$task_file" | head -1 | sed 's/^parallel: *//')

      echo "✅ Ready: #$task_num - $task_name"
      echo "   Epic: $epic_name"
      [ "$parallel" = "true" ] && echo "   🔄 Can run in parallel"
      echo ""
      ((found++))
    else
      # Check if all dependencies are completed
      deps_clean=$(echo "$deps" | sed 's/"//g; s/,/ /g')
      all_completed=true
      for dep in $deps_clean; do
        if [ -f "$epic_dir$dep.md" ]; then
          dep_status=$(grep "^status:" "$epic_dir$dep.md" | head -1 | sed 's/^status: *//' | tr -d '"')
          if [ "$dep_status" != "completed" ]; then
            all_completed=false
            break
          fi
        else
          all_completed=false
          break
        fi
      done

      if [ "$all_completed" = "true" ]; then
        task_name=$(grep "^title:" "$task_file" | head -1 | sed 's/^title: *//' | tr -d '"')
        task_num=$(basename "$task_file" .md)
        parallel=$(grep "^parallel:" "$task_file" | head -1 | sed 's/^parallel: *//')

        echo "✅ Ready: #$task_num - $task_name"
        echo "   Epic: $epic_name"
        echo "   Dependencies: $deps_clean"
        [ "$parallel" = "true" ] && echo "   🔄 Can run in parallel"
        echo ""
        ((found++))
      fi
    fi
  done
done

if [ $found -eq 0 ]; then
  echo "No available tasks found."
  echo ""
  echo "💡 Suggestions:"
  echo "  • Check blocked tasks: /pm:blocked"
  echo "  • View all tasks: /pm:epic-list"
fi

echo ""
echo "📊 Summary: $found tasks ready to start"

exit 0
