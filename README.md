# BrandName - 单页面前端官网

这是一个使用 Next.js (App Router)、TypeScript 和 Tailwind CSS 构建的单页面官网首页项目。

## 技术栈

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Swiper** - 轮播图组件
- **React 18**

## 项目结构

```
/Users/yukino/Desktop/dodo/
├── app/
│   ├── layout.tsx          # 根布局文件
│   ├── page.tsx            # 首页（主页面）
│   └── globals.css         # 全局样式（包含 CSS variables）
├── components/
│   ├── Header.tsx          # 顶部导航栏
│   ├── BannerCarousel.tsx  # Hero Banner 轮播
│   ├── CardsGrid.tsx       # 游戏卡片网格
│   └── Footer.tsx          # 页脚
├── package.json            # 依赖管理
├── tsconfig.json           # TypeScript 配置
├── tailwind.config.ts      # Tailwind CSS 配置
├── postcss.config.js       # PostCSS 配置
├── next.config.js          # Next.js 配置
└── README.md               # 项目说明文档
```

## 页面结构

### 1. Header（顶部导航）
- 左侧：文字 Logo "BrandName"
- 中间：导航链接（Home / Games / Promotions / Provably Fair / Articles）
- 右侧：Log in 按钮
- 响应式：移动端显示汉堡菜单

### 2. Hero Banner（轮播区）
- 使用 Swiper 实现
- 特性：
  - ✅ fade 淡入淡出效果
  - ✅ autoplay 自动播放（hover 暂停）
  - ✅ pagination 分页点
  - ✅ navigation 左右箭头
  - ✅ 每个 slide：标题 + 副标题 + 主/次 CTA 按钮
  - ✅ 渐变背景 + 抽象光效（纯 CSS）
  - ✅ 响应式适配

### 4. Cards Grid（热门内容）
- 8 个游戏卡片网格
- 渐变背景 + 玩家数 + 分类标签
- Hover 缩放效果

### 5. Footer（页脚）
- 多列链接
- 社交媒体图标
- 版权信息

## 主题与换肤

项目使用 **CSS Variables** 实现主题系统，方便后续换肤：

### 默认主题（深色 + 金色）

在 `app/globals.css` 中定义：

```css
:root {
  --background: #0a0e1a;
  --foreground: #e8eaf0;
  --primary: #f59e0b;      /* 金色 */
  --secondary: #3b82f6;    /* 蓝色 */
  --accent: #8b5cf6;       /* 紫色 */
  /* ... 更多变量 */
}
```

### 如何更换主题

1. 修改 `globals.css` 中的 CSS variables
2. 或者在 `:root` 下添加新的主题类，例如：

```css
.theme-light {
  --background: #ffffff;
  --foreground: #000000;
  --primary: #0066cc;
  /* ... */
}
```

然后在 `<body>` 上切换 class 即可。

## 安装与运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问：[http://localhost:3000](http://localhost:3000)

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 依赖列表

### 主要依赖
- `next`: ^14.2.0
- `react`: ^18.3.0
- `react-dom`: ^18.3.0
- `swiper`: ^11.1.0

### 开发依赖
- `typescript`: ^5
- `tailwindcss`: ^3.4.3
- `@types/node`: ^20
- `@types/react`: ^18
- `@types/react-dom`: ^18

## 特性说明

### ✅ 组件化设计
- 所有模块独立为组件
- 便于维护和复用

### ✅ 响应式布局
- 移动端优先
- 适配各种屏幕尺寸

### ✅ 性能优化
- Next.js 自动代码分割
- 图片懒加载
- CSS-in-JS 最小化

### ✅ 可维护性
- TypeScript 类型检查
- 清晰的文件结构
- 注释完善

### ✅ 易于换肤
- CSS Variables 统一管理
- 无硬编码颜色值

## 自定义与扩展

### 修改文案
- 打开相应组件文件
- 修改数组中的文本内容

### 添加新 Section
1. 在 `components/` 下创建新组件
2. 在 `app/page.tsx` 中导入并添加

### 修改颜色
- 编辑 `app/globals.css` 中的 CSS variables
- 或在 `tailwind.config.ts` 中扩展颜色

### 修改 Swiper 配置
- 打开 `components/BannerCarousel.tsx`
- 调整 `<Swiper>` 组件的 props

## 注意事项

1. **图片占位**：项目中使用渐变和抽象图形代替真实图片
2. **链接占位**：所有链接使用 `#` 锚点，需替换为真实路由
3. **登录功能**：Log in 按钮仅为样式，无实际逻辑
4. **响应式测试**：建议在多种设备上测试

## 许可

本项目仅供学习和参考使用。

