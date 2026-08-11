# Xiaohongshu publish notes (adapted)

Upstream ideas from:
- `iamzifei/red-publisher-skill` (CDP + agent-browser, draft-first)
- `autoclaw-cc/xiaohongshu-skills` (CLI publish suite)

Use with this product’s **copy + open** path first. Escalate to CDP only if user asks for browser auto-fill.

## Project default (no CDP)

Publish URL for image notes:

```
https://creator.xiaohongshu.com/publish/imgNote
```

Also used by `starbucks-link` (`PUBLISH_URLS.xiaohongshu` / `server.js` PLATFORMS).

Flow:
1. Copy final caption/title body to clipboard (sync `execCommand` + clipboard API fallback)
2. `window.open` publish URL in the same user-click turn when possible
3. User pastes into editor; do not claim the note was posted automatically

## Optional CDP auto-fill (Windows)

1. Start Chrome with debugging:

```powershell
& "$env:ProgramFiles\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
```

2. In that Chrome, login once at `https://creator.xiaohongshu.com/publish/publish`

3. Prefer sibling skill `xiaohongshu-publisher` (copied under `~/.cursor/skills/xiaohongshu-publisher`) with `npx agent-browser --cdp 9222 ...`

### Safety

- **Default = save draft / stop before 发布**
- Only click 发布 if user clearly says: 直接发布 / 立即发布 / publish now
- Prefer preview/snapshot before any publish click
- Title length on XHS is constrained (~20 display units); keep titles short

## Content shape for notes

```markdown
# 标题（短）

正文口语化……

#标签1 #标签2 #标签3
```

For AI polish inside this product, keep polarity of the user’s real review; do not turn negative drafts into fake praise.
