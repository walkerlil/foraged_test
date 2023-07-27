This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Initial Project Task:

The goal of this project is to create an application that takes in user typed input, and uses good UX (up to you) to display the longest "even" or "odd" streak of letters. Evenness for the letters alternates with a = even, b = odd, c = even, d = odd etc.

A few gotchas:

Whitespace neither counts for a streak, nor breaks a streak
Non-alphabetic characters including numbers break a streak
Capitalization does not matter
Underneath the displayed string, please put the total streak count

Here's an example of what a finished product could look like. Feel free to make it your own:

## Solution

Instead of building direcltly with node.js, I took some liberties and build the application using Next.js 13 (with the app directory), seeing that's what currently being used by the Foraged team.

I trigger the API route whenever the text gets updated on the client side. In the API route, I split the input string into an array and then calculate the longest streak of either "even" or "odd" characters. We display that streak by highlighting the related characters on the text component.

On the client, I couldn't get the highlighting to work with the text directly on the input, so I built a "mock" input which allows us to style the display the text however we need to. I also built a "focusInput" function and put it on all the components so we never lose the focus on the text.

I hope this works for the prompt you gave! Looking forward to hearing back from you.

-Walker Lillard
