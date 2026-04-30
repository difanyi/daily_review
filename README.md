# Daily Review App

一个轻量的「每日复盘」Web 应用模板，适合直接放到 GitHub 作为新项目起点。

## 功能
- 记录今天完成了什么
- 记录遇到的问题与原因
- 记录明日计划
- 自动保存到浏览器本地（localStorage）
- 导出 JSON 备份

## 快速开始
直接在浏览器中打开 `index.html` 即可使用。

## 部署到 GitHub
1. 在 GitHub 创建一个新仓库（例如 `daily-review-app`）。
2. 把本目录代码推送上去：

```bash
git init
git add .
git commit -m "init: daily review app"
git branch -M main
git remote add origin https://github.com/<your-username>/daily-review-app.git
git push -u origin main
```

3. 如果想用 GitHub Pages：
   - 进入仓库 `Settings` → `Pages`
   - Source 选择 `Deploy from a branch`
   - Branch 选择 `main` 和 `/root`

## 技术栈
- HTML
- CSS
- Vanilla JavaScript
