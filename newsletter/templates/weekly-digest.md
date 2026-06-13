# Wonder Why Daily Weekly Digest

This file documents the editorial shape used by the weekly digest generator.
The generated draft is deliberately plain Markdown so it can be reviewed,
edited, and pasted into Buttondown without custom email HTML.

## Draft Shape

```md
# Buttondown Copy

## Subject

This week's Wonders: {featured title}

## Preheader

Seven fascinating questions. How many answers can you guess?

## Body

# What made you wonder this week?

{digest body}
```

The featured Wonder is the week's highest-rated Wonder. If multiple Wonders
share the highest rating, the earliest one published that week is featured.

Copy only the text beneath each `Subject`, `Preheader`, and `Body` heading into
the corresponding Buttondown field.

The digest must never reveal a correct answer, short answer, explanation,
takeaway, or Cool Fact.
