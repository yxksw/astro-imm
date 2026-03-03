---
title: '第三篇文章'
description: '探索更多 Markdown 语法和博客功能'
pubDate: '2022-07-22'
heroImage: '../../assets/blog-placeholder-2.jpg'
---

欢迎来到第三篇文章！这篇文章将带你探索更多 Markdown 语法和博客的高级功能。

## 链接与引用

### 外部链接

你可以轻松添加外部链接，点击即可访问：

- [Astro 官网](https://astro.build) - 快速、内容驱动的网站构建框架
- [GitHub](https://github.com) - 全球最大的代码托管平台
- [MDN Web Docs](https://developer.mozilla.org) - Web 开发者的权威文档

### 内部链接

链接到博客内的其他文章：

- [第一篇博客文章](/blog/first-post)
- [第二篇文章](/blog/second-post)

## 高级排版

### 任务列表

创建可勾选的任务列表：

- [x] 学习 Markdown 语法
- [x] 搭建博客网站
- [x] 发布第一篇文章
- [ ] 优化网站性能
- [ ] 添加更多功能

### 水平分割线

使用分割线来分隔不同章节：

---

### 脚注

你可以添加脚注来补充说明[^1]。

[^1]: 这是一个脚注示例。

## 代码高亮

支持多种编程语言的语法高亮：

### Python

```python
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# 打印前10个斐波那契数
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

### HTML

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>示例页面</title>
</head>
<body>
    <h1>欢迎来到我的博客</h1>
    <p>这是一个示例段落。</p>
</body>
</html>
```

## 数学公式

虽然标准 Markdown 不支持数学公式，但你可以使用 LaTeX 语法：

行内公式：$E = mc^2$

块级公式：

$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$

## 提示框

使用引用块创建不同类型的提示：

> 💡 **提示**
> 这是一个有用的提示信息。

> ⚠️ **注意**
> 这是一个需要注意的警告信息。

> 🚨 **重要**
> 这是一个重要的提醒。

## 总结

通过这三篇文章，你已经了解了博客的基本功能：

1. **第一篇** - 博客介绍和基本功能
2. **第二篇** - 文本样式和代码展示
3. **第三篇** - 链接、任务列表和高级排版

现在你可以开始创作自己的文章了！
