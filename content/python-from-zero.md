---
slug: python-from-zero
title: "Python From Zero"
summary: "A complete guide to Python: how programs run, variables, types, control flow, loops, functions, debugging, mini-projects, and interactive quizzes that explain every wrong answer."
category: "Programming"
type: course
level: beginner
tier: deep
price: 5
minutes: 220
tags: [python, programming basics, coding, variables, loops, functions]
featured: true
publishedAt: "2026-03-08"
---

## What You'll Learn

By the end of this lesson, you will be able to:

- Explain what programming is and how the Python interpreter executes code.
- Write statements using values, variables, expressions, and assignments.
- Use core data types: strings, integers, floats, booleans, and lists.
- Make decisions with `if`, `elif`, and `else`, including compound conditions.
- Repeat work with `for` loops and `while` loops, and know when each fits.
- Organize reusable logic with functions, parameters, return values, and scope.
- Read common error messages calmly and fix beginner mistakes systematically.
- Build small practical programs: calculators, validators, list processors, and text tools.
- Complete exercises that deepen understanding rather than only copying syntax.

Python is one of the best first programming languages because it is readable, practical, and widely used. People use Python for web development, data analysis, automation, artificial intelligence, finance, education, scientific computing, testing, and everyday scripts. But the real reason Python is beginner-friendly is not popularity alone. It is the way Python lets you express ideas with relatively little visual clutter, so you can focus on thinking clearly.

Programming is the act of giving a computer precise instructions. A computer does not understand intentions, vibes, or "you know what I mean." It follows instructions exactly. If the instructions are correct, the result can feel powerful. If the instructions are incomplete or slightly wrong, the computer will either produce the wrong result or show an error. This is normal. Errors are not proof that you are bad at programming. They are part of the conversation between you and the machine.

Think of programming like writing a recipe for a very literal cook. If you write, "make dinner," the cook cannot guess what you mean. If you write, "boil water, add pasta, cook for ten minutes, drain, then mix with sauce," the cook has a sequence to follow. Python is a language for writing those sequences—and for naming values, making decisions, repeating steps, and packaging reusable procedures.

This lesson is written as a beginner textbook. You will see explanations, analogies, worked examples, failure stories, exercises, and interactive quizzes. You do not need prior coding experience. You do need willingness to type code, break it, read the error, and try again.

## How to Study This Lesson

Read with a Python environment open if possible—a local install, a notebook, or an online REPL. After each short example, predict the output before running it. Prediction builds mental models faster than passive reading. When your prediction is wrong, do not rush past the surprise. That surprise is the lesson.

A useful study loop:

1. Read a concept.
2. Type a tiny example from scratch (avoid only copy-pasting).
3. Change one thing and predict the new behavior.
4. Explain the concept in one plain sentence without jargon.
5. Do the exercises without looking at the answer key first.

## What Programming Really Is

Programming is translating a goal into unambiguous steps a machine can execute. The hard part is often not syntax. The hard part is clarifying the goal.

Suppose you want a program that "handles user ages." That is vague. Do you mean:

- ask for an age and reject non-numbers,
- classify someone as child/teen/adult,
- compute birth year from age,
- or store ages for many users and compute an average?

Until the goal is precise, code will wander. Professional programmers spend significant time refining requirements before and during coding. Beginners should practice the same habit at small scale: write the intended behavior in plain English first, then implement.

### Programs Are State Plus Behavior

Most programs manage **state** (information remembered right now) and **behavior** (instructions that use and change that information). A variable holding a score is state. Adding points when the player answers correctly is behavior. Lists of tasks are state. Looping to print unfinished tasks is behavior. Once you see this duality, Python constructs start to feel purposeful rather than arbitrary.

### Algorithms Versus Languages

An **algorithm** is a process for solving a problem. A **programming language** is a notation for expressing algorithms so computers can run them. The same algorithm—"find the largest number in a list"—can be written in Python, JavaScript, or many other languages. Learning Python teaches one notation deeply while also training algorithmic thinking that transfers.

## How Python Code Runs

A Python program is text containing instructions. The **Python interpreter** reads those instructions and executes them. An interpreter is a program that understands Python syntax and carries out actions on your computer.

The simplest Python program is:

```python
print("Hello, world!")
```

The `print()` function displays output. The words inside quotation marks are a **string**, meaning text data. When this program runs, Python outputs:

```text
Hello, world!
```

This tiny example already contains important ideas:

- `print` is the name of a function.
- Parentheses `()` call the function.
- `"Hello, world!"` is an argument passed into the call.
- Python executes from top to bottom unless control flow redirects it.

If you write:

```python
print("First")
print("Second")
print("Third")
```

Python prints:

```text
First
Second
Third
```

Order matters. Programs are often sequences of small steps that build on each other. Later, conditions and loops will let you skip, choose, or repeat steps—but the default story is still sequential execution.

### Statements, Expressions, and Evaluation

An **expression** is code that produces a value, such as `2 + 3` or `"Hi" + "!"`. A **statement** is an instruction that performs an action, such as an assignment or a `print` call. Some constructs are both, depending on context, but the distinction helps beginners.

When Python sees `2 + 3`, it **evaluates** the expression to `5`. When Python sees `print(2 + 3)`, it evaluates `2 + 3` first, then passes `5` to `print`.

### Comments and Readability

Comments begin with `#` and are ignored by Python:

```python
# Greet the learner
print("Welcome to Python From Zero")
```

Use comments to explain why, not to narrate obvious syntax. Clear names often reduce the need for comments.

### Indentation Is Syntax

Unlike some languages that use braces to mark blocks, Python uses indentation. This will matter as soon as you write `if` statements and loops. Mixing tabs and spaces carelessly can create confusing errors. Pick spaces (four spaces is the common convention) and stay consistent.

<!-- quiz:python-checkpoint-1 -->

## Values and Data Types

A **value** is a piece of data. Python has different **data types** for different kinds of values. Types matter because they determine valid operations.

Common beginner types:

- `str`: text, such as `"Python"` or `"hello"`
- `int`: whole numbers, such as `3`, `42`, or `-10`
- `float`: decimal numbers, such as `3.14` or `19.99`
- `bool`: truth values, `True` or `False`
- `list`: ordered collections, such as `["AI", "Python", "Data"]`

You can inspect a type with `type()`:

```python
print(type("hello"))
print(type(42))
print(type(3.14))
print(type(True))
print(type([1, 2, 3]))
```

### Numbers and Arithmetic

```python
print(10 + 5)
print(10 - 3)
print(4 * 7)
print(20 / 4)
print(20 // 4)
print(20 % 3)
print(2 ** 8)
```

Notes that trip beginners:

- `/` always performs true division and returns a float (`20 / 4` is `5.0`).
- `//` is floor division.
- `%` is the remainder (modulo), useful for even/odd checks and wrapping around.
- `**` is exponentiation.

Operator precedence follows familiar math rules; parentheses clarify intent:

```python
print(2 + 3 * 4)      # 14
print((2 + 3) * 4)    # 20
```

### Strings

Strings can use single or double quotes:

```python
name = "Maya"
city = 'Lisbon'
```

Concatenate with `+`, repeat with `*`:

```python
print("Hello, " + "Maya")
print("ha" * 3)
```

You cannot concatenate strings and numbers directly:

```python
# print("Age: " + 30)  # TypeError
print("Age: " + str(30))
print(f"Age: {30}")
```

**f-strings** (formatted string literals) are the modern, readable way to mix text and values:

```python
course = "Python From Zero"
minutes = 220
print(f"This lesson, {course}, targets about {minutes} minutes.")
```

Useful string operations:

```python
text = "  Python Foundations  "
print(text.strip())
print(text.lower())
print(text.upper())
print("Found" in text)
print(len("Python"))
print("a,b,c".split(","))
print("-".join(["2026", "03", "08"]))
```

Indexing and slicing extract characters:

```python
word = "Python"
print(word[0])     # P
print(word[-1])    # n
print(word[0:3])   # Pyt
print(word[2:])    # thon
```

Remember: Python indexing starts at `0`. The slice end index is exclusive.

### Booleans and Comparisons

Booleans are `True` and `False`. Comparisons produce booleans:

```python
print(10 > 3)
print(10 == 10)
print(10 != 9)
print("py" == "Py")
print(5 >= 5)
```

Logical operators combine boolean values:

```python
age = 20
has_id = True
print(age >= 18 and has_id)
print(age < 18 or has_id)
print(not has_id)
```

Use parentheses when compound conditions grow:

```python
score = 82
attended = True
print((score >= 80 and attended) or score >= 95)
```

### Lists: Ordered Collections

Lists store ordered sequences of values:

```python
skills = ["Python", "SQL", "Git"]
print(skills[0])
skills.append("Linux")
skills.insert(1, "Excel")
print(len(skills))
print("SQL" in skills)
```

Lists are mutable: you can change them after creation.

```python
nums = [3, 1, 4]
nums[0] = 99
nums.sort()
print(nums)
```

Common list patterns:

```python
# Build a list in a loop
squares = []
for n in range(1, 6):
    squares.append(n * n)
print(squares)

# Copy carefully
a = [1, 2, 3]
b = a          # alias: same list object
c = a.copy()   # shallow copy: separate list
b.append(4)
print(a, c)
```

Beginners often confuse aliases with copies. If two names point to the same list, mutating through one name is visible through the other.

## Variables and Assignment

A **variable** is a name that refers to a value.

```python
price = 19.99
quantity = 3
total = price * quantity
print(total)
```

Assignment does not mean mathematical equality forever. It means: evaluate the right-hand side, then make the name refer to that result.

```python
score = 10
score = score + 5
score += 5
print(score)
```

### Naming Rules and Style

- Names may contain letters, numbers, and underscores, but cannot start with a number.
- Names are case-sensitive (`total` and `Total` are different).
- Use snake_case for variables and functions: `user_name`, `compute_total`.
- Prefer descriptive names over cryptic ones: `student_count` beats `sc`.
- Avoid shadowing built-ins like `list`, `str`, `print`, `sum` as names if you can.

### Multiple Assignment and Swapping

```python
x, y = 1, 2
x, y = y, x
print(x, y)
```

### Constants by Convention

Python does not enforce true constants, but uppercase names signal "do not change casually":

```python
MAX_ATTEMPTS = 3
TAX_RATE = 0.18
```

## Input, Conversion, and Validation

`input()` reads text from the user as a string:

```python
name = input("What is your name? ")
print(f"Hello, {name.strip().title()}!")
```

Convert types explicitly:

```python
raw = input("Enter quantity: ")
quantity = int(raw)
print(quantity * 2)
```

Conversion can fail:

```python
# int("3.5")  # ValueError
# int("hello")  # ValueError
float("3.5")    # OK
```

A beginner-friendly validation pattern:

```python
raw = input("Enter an integer age: ").strip()
if raw.isdigit():
    age = int(raw)
    print(f"Next year you will be {age + 1}.")
else:
    print("Please enter a whole number like 21.")
```

Note: `isdigit()` is a simple start; it rejects negatives and decimals. Real-world validation can be stricter or more flexible depending on needs.

## Making Decisions With Conditionals

Programs become useful when they choose behavior based on data.

```python
temperature = 31
if temperature >= 30:
    print("Heat warning")
elif temperature >= 20:
    print("Warm day")
else:
    print("Cooler day")
```

Python checks conditions top to bottom and runs the first matching block.

### Nested Conditions

```python
logged_in = True
is_admin = False
if logged_in:
    if is_admin:
        print("Admin dashboard")
    else:
        print("User dashboard")
else:
    print("Please log in")
```

Nesting works, but deep nesting becomes hard to read. Prefer clearer compound conditions or early returns inside functions when logic grows.

### Truthiness

In conditions, Python treats some values as falsey: `False`, `0`, `0.0`, `""`, `[]`, `None`, among others. Non-empty containers and most other values are truthy.

```python
items = []
if items:
    print("You have items")
else:
    print("Empty list")
```

Be careful: truthiness is convenient but can hide bugs if you meant to check something more specific, such as `if items is None`.

### Case Study: Ticket Pricing Rules

```python
age = 15
day = "Sunday"
base = 12.0

if age < 5:
    price = 0.0
elif age < 18:
    price = base * 0.5
elif age >= 65:
    price = base * 0.7
else:
    price = base

if day == "Tuesday":
    price *= 0.8

print(f"Ticket price: {price:.2f}")
```

This example shows layered rules: age bands first, then a day discount. Translating policy prose into ordered conditions is a core programming skill.

<!-- quiz:python-checkpoint-2 -->

## Loops: Repeating Work Without Copy-Paste

Loops let you repeat instructions. Without loops, processing one hundred items would require miserable repetition.

### `for` Loops

`for` loops iterate over a sequence:

```python
languages = ["Python", "SQL", "JavaScript"]
for language in languages:
    print(f"I am learning {language}")
```

`range` generates integer sequences:

```python
for i in range(5):
    print(i)

for i in range(1, 6):
    print(i)

for i in range(0, 10, 2):
    print(i)
```

### Accumulator Pattern

One of the most important beginner patterns is accumulation:

```python
scores = [80, 95, 70, 88]
total = 0
for score in scores:
    total += score
average = total / len(scores)
print(total, average)
```

You can also count matches:

```python
words = ["ai", "python", "data", "api"]
count = 0
for word in words:
    if len(word) <= 3:
        count += 1
print(count)
```

### `while` Loops

`while` repeats as long as a condition remains true:

```python
n = 3
while n > 0:
    print(n)
    n -= 1
print("Go")
```

`while` is ideal when you do not know in advance how many iterations you need—for example, re-prompting until input is valid:

```python
while True:
    raw = input("Enter a positive number: ").strip()
    if raw.replace(".", "", 1).isdigit():
        value = float(raw)
        if value > 0:
            print(f"Accepted: {value}")
            break
    print("Try again.")
```

### `break` and `continue`

- `break` exits the loop immediately.
- `continue` skips the rest of the current iteration and continues with the next.

```python
for n in range(1, 10):
    if n % 2 == 0:
        continue
    if n > 7:
        break
    print(n)
```

### Infinite Loops

If a `while` condition never becomes false and you never `break`, the loop runs forever. If that happens, interrupt execution and inspect whether you forgot to update a variable.

### Case Study: Cleaning a List of Names

```python
raw_names = ["  maya ", "JULES", "", "  ", "Alex"]
clean = []
for name in raw_names:
    cleaned = name.strip().title()
    if cleaned:
        clean.append(cleaned)
print(clean)
```

This is realistic beginner work: normalize text, skip empties, build a new list. Many data tasks are variations of this pattern.

## Functions: Packaging Reusable Logic

Functions let you name a process, reuse it, test it, and keep programs modular.

```python
def greet(name):
    return f"Hello, {name.strip().title()}!"

print(greet("  maya "))
```

### Parameters and Arguments

Parameters are names in the function definition. Arguments are values you pass in when calling.

```python
def discount_price(price, rate):
    return price * (1 - rate)

print(discount_price(100, 0.2))
```

Default parameter values help optional behavior:

```python
def greet(name, excited=False):
    message = f"Hello, {name}"
    if excited:
        message += "!"
    return message

print(greet("Maya"))
print(greet("Maya", excited=True))
```

### Return Values Versus Print

Beginners often confuse printing with returning.

```python
def add_print(a, b):
    print(a + b)

def add_return(a, b):
    return a + b

x = add_print(2, 3)   # prints 5, x is None
y = add_return(2, 3)  # y is 5
print(x, y)
```

Use `print` to show something to humans. Use `return` to hand a value back to the rest of the program.

### Local Scope

Variables assigned inside a function are local by default:

```python
def demo():
    value = 10
    return value

print(demo())
# print(value)  # NameError
```

Scope prevents functions from accidentally interfering with each other. Pass inputs in; return outputs out.

### Docstrings and Clarity

```python
def celsius_to_fahrenheit(celsius):
    """Convert Celsius temperature to Fahrenheit."""
    return (celsius * 9 / 5) + 32
```

Short docstrings help future readers—including you in two weeks.

### Case Study: Reusable Input Helpers

```python
def read_float(prompt):
    while True:
        raw = input(prompt).strip()
        try:
            return float(raw)
        except ValueError:
            print("Please enter a number.")

def rectangle_area():
    width = read_float("Width: ")
    height = read_float("Height: ")
    return width * height

# area = rectangle_area()
# print(area)
```

This design separates validation from business logic. As programs grow, that separation becomes essential.

## Errors, Exceptions, and Debugging Mindset

Errors are information. The stack trace tells you what failed and where.

Common beginner errors:

- `SyntaxError`: code structure is invalid (missing colon, unmatched quotes).
- `NameError`: you used a name that is not defined.
- `TypeError`: operation is invalid for those types.
- `ValueError`: type is right-ish but the value cannot be converted/processed.
- `IndexError`: list index out of range.
- `KeyError`: dictionary key missing (when you reach dicts).
- `IndentationError`: indentation is inconsistent or missing.

Debugging process:

1. Read the final error type and message carefully.
2. Jump to the reported line number.
3. Inspect related variables with `print` or a debugger.
4. Reproduce with the smallest possible example.
5. Fix one issue at a time.
6. Re-run and confirm.

### `try` / `except` for Expected Failures

```python
def parse_int(text):
    try:
        return int(text)
    except ValueError:
        return None

print(parse_int("42"))
print(parse_int("nope"))
```

Do not wrap your entire program in a blank `except:` that swallows all errors. Catch specific failures you can handle.

## Dictionaries: A Preview You Will Need Soon

After lists, dictionaries are the next major structure. A dictionary maps keys to values:

```python
student = {
    "name": "Maya",
    "level": "beginner",
    "active": True,
}
print(student["name"])
student["score"] = 92
print(student.get("email", "missing"))
```

Dictionaries model real records: users, settings, product details. Many APIs return JSON that maps naturally to Python dictionaries.

```python
inventory = {"pens": 10, "notebooks": 5}
for item, count in inventory.items():
    print(f"{item}: {count}")
```

## Modules and the Standard Library Habit

Python ships with batteries included. You can import modules:

```python
import math
from random import choice

print(math.sqrt(16))
print(choice(["red", "green", "blue"]))
```

Knowing that a standard tool might already exist is part of fluency. You do not need to memorize the whole library; you need to remember to look.

## Style, Clarity, and Small Design Rules

Readable code is not cosmetic. It reduces bugs.

Practical rules for beginners:

- Keep functions short enough to describe in one sentence.
- Prefer clear names over clever names.
- Avoid magic numbers; name important constants.
- Do one transformation at a time when learning.
- Write comments for intent and assumptions.
- Consistency beats perfection.

Example refactor:

```python
# Less clear
def t(a, b):
    return a * 1.18 + b

# Clearer
TAX_RATE = 0.18

def total_with_tax(subtotal, shipping):
    return subtotal * (1 + TAX_RATE) + shipping
```

## Worked Mini-Project 1: Grade Summary Tool

Goal: given a list of numeric scores, compute average, highest, lowest, and a pass count.

```python
def summarize_scores(scores, pass_mark=60):
    if not scores:
        return {
            "count": 0,
            "average": None,
            "highest": None,
            "lowest": None,
            "pass_count": 0,
        }
    total = 0
    highest = scores[0]
    lowest = scores[0]
    pass_count = 0
    for score in scores:
        total += score
        if score > highest:
            highest = score
        if score < lowest:
            lowest = score
        if score >= pass_mark:
            pass_count += 1
    return {
        "count": len(scores),
        "average": total / len(scores),
        "highest": highest,
        "lowest": lowest,
        "pass_count": pass_count,
    }

result = summarize_scores([70, 55, 90, 100, 60])
print(result)
```

Why this project matters: it combines lists, loops, conditionals, functions, and dictionaries. It also introduces guarding against empty input.

## Worked Mini-Project 2: Phrase Analyzer

Goal: analyze a sentence for character count, word count, and word frequency of a target word.

```python
def analyze_phrase(text, target):
    cleaned = text.strip().lower()
    words = cleaned.replace(".", "").replace(",", "").split()
    count_target = 0
    for word in words:
        if word == target.lower():
            count_target += 1
    return {
        "characters": len(text),
        "words": len(words),
        "target": target,
        "target_count": count_target,
    }

print(analyze_phrase("Python is friendly. Python is powerful.", "python"))
```

Extensions you can try: ignore more punctuation, count every word into a dictionary, or return the longest word.

## Worked Mini-Project 3: Simple Budget Checker

```python
def budget_report(income, expenses):
    total_expense = 0
    for category, amount in expenses.items():
        total_expense += amount
    remaining = income - total_expense
    status = "under budget" if remaining >= 0 else "over budget"
    return {
        "income": income,
        "total_expense": total_expense,
        "remaining": remaining,
        "status": status,
    }

expenses = {"rent": 700, "food": 250, "transport": 80, "fun": 120}
print(budget_report(1100, expenses))
```

This mirrors real personal automation scripts: categorize values, aggregate, and produce a status message.

## Common Beginner Mistakes (And How to Recover)

### Mistake 1: Using `=` When You Mean `==`

`=` assigns. `==` compares. Inside `if` conditions you almost always want `==`.

### Mistake 2: Off-by-One Errors in Ranges and Indexes

`range(5)` yields 0..4. A list of length 3 has valid indexes 0..2. Draw boxes on paper if needed.

### Mistake 3: Mutating While Confused About Aliases

If you pass a list into a function and append inside the function, the caller sees the change because lists are mutable. That can be useful or surprising.

### Mistake 4: Infinite `while` Loops

Always ask: what guaranteed progress moves us toward stopping?

### Mistake 5: Doing Everything in the Global Scope

If your script becomes a long pile of loose lines, extract functions. Named steps are easier to test.

### Mistake 6: Fear of Errors

An unread error message can waste half an hour. A carefully read error message can save half an hour. Slow down at the traceback.

## How Professionals Think About Small Programs

Even tiny scripts benefit from a mini design process:

1. **Examples first**: write two sample inputs and expected outputs.
2. **Edge cases**: empty input, zeros, negatives, huge values, messy spaces.
3. **Data shape**: what types do I store?
4. **Steps in English**: ordered bullets before code.
5. **Implement thinly**: get a stub working, then enrich.
6. **Test manually**: run the examples and edge cases.
7. **Refactor**: rename, extract functions, remove duplication.

This process scales from homework problems to professional features.

## Bridging to the Next Skills

After this lesson, natural next topics include:

- dictionaries and nested data more deeply,
- file reading and writing,
- working with CSV data,
- list comprehensions,
- virtual environments and packages,
- object-oriented basics,
- and automated tests with `assert` or `pytest`.

You do not need all of that immediately. If you can confidently use variables, conditionals, loops, and functions, you already have the core engine of programming.

## Practice Exercises

### Exercise 1: Predict the Output

Predict without running:

```python
a = 5
b = 2
print(a / b)
print(a // b)
print(a % b)
print(a ** b)
```

### Exercise 2: Fix the Bug

This code is broken. Repair it so it prints a greeting with the uppercase name:

```python
name = input("Name: ")
print("Hello, " + name.upper)
```

### Exercise 3: Classify Temperatures

Write a function `label_temperature(celsius)` that returns `"cold"`, `"comfortable"`, or `"hot"` using thresholds you choose. Document your thresholds in a comment.

### Exercise 4: List Filtering

Given `nums = [3, 11, 8, 15, 2, 20]`, build a new list of numbers greater than or equal to 10 using a loop.

### Exercise 5: Safe Division Function

Write `safe_divide(a, b)` that returns the quotient if `b` is not zero, otherwise returns `None`.

### Exercise 6: Word Stats

Write a program that asks for a sentence and prints:

- number of characters (including spaces),
- number of words,
- the first word,
- the last word.

### Exercise 7: Multiplication Table

Print a multiplication table for 1 through 10 for a user-chosen number using a loop.

### Exercise 8: Todo List Mini-App (Conceptual)

Design—in comments or pseudocode—a tiny todo list that can add a task, list tasks, and mark a task complete. Then implement as much as you can with a Python list of dictionaries.

### Exercise 9: Refactor Challenge

Refactor this into cleaner functions and names:

```python
s = [70, 80, 90]
t = 0
for x in s:
    t = t + x
print(t / len(s))
```

### Exercise 10: Error Reading Drill

For each error, explain the likely cause in plain English:

1. `NameError: name 'total' is not defined`
2. `TypeError: can only concatenate str (not "int") to str`
3. `IndexError: list index out of range`
4. `ValueError: invalid literal for int() with base 10: '3.2'`

## Answer Key

### Exercise 1

Outputs: `2.5`, `2`, `1`, `25`.

### Exercise 2

`name.upper` should be called: `name.upper()`.

### Exercise 3 Sample

```python
def label_temperature(celsius):
    # cold < 15, comfortable 15-27, hot > 27
    if celsius < 15:
        return "cold"
    elif celsius <= 27:
        return "comfortable"
    else:
        return "hot"
```

### Exercise 4 Sample

```python
nums = [3, 11, 8, 15, 2, 20]
result = []
for n in nums:
    if n >= 10:
        result.append(n)
print(result)
```

### Exercise 5 Sample

```python
def safe_divide(a, b):
    if b == 0:
        return None
    return a / b
```

### Exercise 6 Guidance

Split on spaces after stripping; handle empty input; use indexing carefully for first/last words.

### Exercise 7 Sample

```python
n = int(input("Number: "))
for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")
```

### Exercise 8 Guidance

Represent tasks as `{"title": "...", "done": False}`. Use a menu loop with options add/list/complete/quit.

### Exercise 9 Sample

```python
def average(scores):
    total = 0
    for score in scores:
        total += score
    return total / len(scores)

print(average([70, 80, 90]))
```

### Exercise 10 Guidance

1. You used a variable before creating it, or a typo in the name.
2. You tried to combine string and int with `+` without conversion.
3. You asked for an index that does not exist given the list length.
4. `int()` cannot parse `'3.2'`; use `float()` first or reject decimals.



## A Second Pass on Mental Models: The Notional Machine

Beginners progress faster when they build a **notional machine**: a simplified mental model of what the computer is doing. For Python, a practical notional machine looks like this:

1. Your source file is a sequence of instructions.
2. Python reads the next instruction.
3. It evaluates expressions into values.
4. Names in a namespace refer to objects in memory.
5. Assignment rebinds a name to an object.
6. Calling a function creates a temporary local namespace.
7. Returning from a function sends a value back and discards that local namespace (generally speaking).
8. Control flow can skip or repeat regions of code.

When something surprises you, ask which of these steps you misunderstood. For example, if two variables seem to change together, you may have two names referring to one mutable object. If a function "forgets" a value, you may have printed instead of returned. If a loop never ends, step 8 is missing an exit path.

### Objects and References (Beginner Version)

In Python, values are objects. Variable names are labels attached to objects. For immutable objects like integers and strings, reassignment creates a new binding and feels simple. For mutable objects like lists, in-place changes are visible through every label attached to that same object.

```python
x = [1, 2]
y = x
y.append(3)
print(x)  # [1, 2, 3]
```

This is not Python being weird. It is reference semantics. Once you see it, a whole family of bugs becomes understandable.

## Deep Dive: Expressions in the Wild

Expressions appear everywhere, not only in math.

```python
name = "Maya"
active = True
score = 87

label = "pass" if score >= 60 else "fail"
display = name.upper() if active else "inactive"
print(label, display)
```

The conditional expression (`a if condition else b`) is useful for compact value selection. Prefer full `if` statements when each branch needs multiple lines or complex logic.

Another common expression pattern is chaining comparisons:

```python
x = 15
print(10 < x < 20)  # True
```

This reads like mathematics and reduces mistakes from writing awkward `and` conditions.

## Strings as Data, Not Just Messages

Many real programs are mostly string processing: cleaning names, parsing commands, validating emails in a simple way, normalizing paths, or formatting reports.

### Case Study: Normalizing User Handles

```python
def normalize_handle(raw):
    handle = raw.strip().lower()
    if handle.startswith("@"):
        handle = handle[1:]
    # keep letters, digits, underscore
    cleaned = []
    for ch in handle:
        if ch.isalnum() or ch == "_":
            cleaned.append(ch)
    return "".join(cleaned)

samples = ["  @Maya_Dev ", "Jules!", "Alex-99", "@@@"]
for s in samples:
    print(s, "->", normalize_handle(s))
```

Notice the technique: strip, lowercase, remove a prefix, then rebuild a filtered string. This "filter by rebuilding" pattern appears constantly.

### Formatting for Humans

```python
price = 19.5
count = 3
print(f"Total: ${price * count:.2f}")
print(f"|{'Item':<12}|{'Qty':>5}|")
print(f"|{'Notebook':<12}|{count:>5}|")
```

Formatting is part of product quality. Raw dumps are fine while debugging; polished output matters when a human must trust the program.

## Numbers Beyond the Basics

### Integers Grow as Needed

Python integers can become very large without the fixed-size overflow surprises common in some other languages:

```python
print(2 ** 100)
```

That convenience is wonderful for learning and for many applications. Still, for money, prefer careful decimal strategies later (`decimal` module) because binary floating point can surprise you:

```python
print(0.1 + 0.2)  # classic float curiosity
```

For this beginner course, awareness is enough: do not assume every decimal is stored exactly.

### Practical Numeric Patterns

```python
def clamp(value, low, high):
    if value < low:
        return low
    if value > high:
        return high
    return value

def percent(part, whole):
    if whole == 0:
        return None
    return (part / whole) * 100

print(clamp(120, 0, 100))
print(percent(2, 8))
```

These tiny helpers show how functions turn recurring numeric ideas into named tools.

## Booleans as Design Tools

Booleans are not only comparison leftovers; they encode decisions.

```python
def can_publish(is_author, is_reviewed, is_banned):
    return is_author and is_reviewed and not is_banned

print(can_publish(True, True, False))
```

Named boolean functions improve readability dramatically:

```python
def is_strong_password(password):
    has_length = len(password) >= 8
    has_digit = any(ch.isdigit() for ch in password)
    has_alpha = any(ch.isalpha() for ch in password)
    return has_length and has_digit and has_alpha
```

Even if you have not mastered generators yet, you can rewrite `any(...)` with an explicit loop. The design idea matters more than the shortcut:

```python
def has_digit(text):
    for ch in text:
        if ch.isdigit():
            return True
    return False
```

## Lists as Working Memory

Lists are where many programs keep their working set.

### Indexing Patterns

```python
days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
print(days[0], days[-1])
print(days[1:4])
print(days[::-1])  # reversed copy
```

### Parallel Construction

Build related lists carefully, or better, keep related values together:

```python
# Weaker: parallel lists can drift out of sync
names = ["Maya", "Jules"]
scores = [91, 88]

# Stronger for records: list of dicts
students = [
    {"name": "Maya", "score": 91},
    {"name": "Jules", "score": 88},
]
```

As soon as data has multiple fields, structures that keep fields together reduce bugs.

### Case Study: Leaderboard Top-N

```python
def top_n(students, n=3):
    ordered = sorted(students, key=lambda s: s["score"], reverse=True)
    return ordered[:n]

roster = [
    {"name": "Maya", "score": 91},
    {"name": "Jules", "score": 88},
    {"name": "Alex", "score": 95},
    {"name": "Sam", "score": 70},
]
print(top_n(roster, 2))
```

You may not know `lambda` yet; an equivalent sorting key function works fine. The lesson is compositional thinking: sort, then slice.

## Conditionals as Policy Engines

Business and product rules often arrive as paragraphs. Your job is to turn them into ordered logic.

### Case Study: Shipping Policy

Policy text:

- Orders of $50 or more ship free.
- Otherwise shipping is $5.99.
- Express shipping adds $10.
- Banned regions cannot ship.

```python
def shipping_cost(subtotal, express=False, region="US"):
    banned = {"XX", "ZZ"}
    if region in banned:
        return None  # means cannot ship
    cost = 0.0 if subtotal >= 50 else 5.99
    if express:
        cost += 10
    return cost

print(shipping_cost(40, express=True))
print(shipping_cost(80))
print(shipping_cost(80, region="XX"))
```

Key idea: decide the "hard stop" cases first (banned region), then compute normal pricing. Order prevents impossible combinations.

## Loops as Data Transformers

Most loops do one of four jobs:

1. **Map**: transform each item.
2. **Filter**: keep some items.
3. **Reduce/accumulate**: collapse many items into one value.
4. **Search**: find a match and stop.

```python
values = [2, 5, 8, 3, 10]

# map
doubled = []
for v in values:
    doubled.append(v * 2)

# filter
high = []
for v in values:
    if v >= 5:
        high.append(v)

# reduce
total = 0
for v in values:
    total += v

# search
found = None
for v in values:
    if v == 8:
        found = v
        break

print(doubled, high, total, found)
```

If you can identify which job you need, writing the loop becomes much easier.

### Nested Loops and Complexity Awareness

```python
grid = [
    [1, 2, 3],
    [4, 5, 6],
]
for row in grid:
    for cell in row:
        print(cell, end=" ")
    print()
```

Nested loops are fine for small data and grids. For large data, nested looping over huge collections can become slow. At beginner level, correctness comes first; awareness of growth comes second.

## Functions as Contracts

Think of each function as a contract:

- **Preconditions**: what must be true about inputs?
- **Postconditions**: what does it guarantee about outputs/effects?
- **Invariants**: what should remain true?

```python
def average(scores):
    """Return arithmetic mean of a non-empty list of numbers."""
    if not scores:
        raise ValueError("scores must be non-empty")
    return sum(scores) / len(scores)
```

Raising an error may feel harsh, but failing loudly is often better than returning a silent nonsense value. In other situations, returning `None` is acceptable if callers always check. Pick a convention and document it.

### Pure Functions Versus Side Effects

A **pure function** depends only on its inputs and returns a value without changing outside state. Side effects include printing, writing files, mutating global variables, or modifying input lists in place.

```python
# Mostly pure
def add(a, b):
    return a + b

# Side effect: prints
def show_add(a, b):
    print(a + b)
```

Pure functions are easier to test. Side effects are necessary for real programs. Good design isolates side effects near the edges (input/output) and keeps core logic pure when practical.

## Debugging Workshop: A Broken Script

Broken version:

```python
def load_ages(lines):
    ages = []
    for line in lines:
        line = line.strip()
        if line == "":
            continue
        ages.append(line)  # bug: forgot int conversion
    return ages

def average_age(ages):
    total = 0
    for age in ages:
        total += age
    return total / len(ages)

data = ["21", " 34 ", "", "19"]
ages = load_ages(data)
print(average_age(ages))
```

What happens? `TypeError` when adding strings together in numeric accumulation, or more precisely when trying to add int total to str age depending on version of the mistake. The diagnosis process:

1. Reproduce.
2. Print `ages` after loading.
3. Observe they are strings.
4. Convert with `int(line)` after validation.
5. Re-test with empty list guard.

Fixed core:

```python
ages.append(int(line))
```

Plus an empty-list guard in `average_age`. Debugging is not a talent lottery. It is a disciplined narrowing process.

## Testing Habits Without a Framework

Before learning `pytest`, you can still test:

```python
def assert_equal(actual, expected, label):
    if actual != expected:
        raise AssertionError(f"{label}: expected {expected!r}, got {actual!r}")
    print(f"OK: {label}")

assert_equal(normalize_handle(" @Maya "), "maya", "normalize basic")
assert_equal(shipping_cost(50), 0.0, "free shipping threshold")
assert_equal(shipping_cost(49.99), 5.99, "paid shipping")
```

Write tests for the happy path and one edge case each time you create a function. This habit pays compound interest.

## Program Design Studio: Flashcard Quizzer

Build a console flashcard quizzer step by step.

### Step 1: Data

```python
cards = [
    {"prompt": "What keyword defines a function?", "answer": "def"},
    {"prompt": "What operator tests equality?", "answer": "=="},
    {"prompt": "What built-in outputs text?", "answer": "print"},
]
```

### Step 2: Ask One Card

```python
def ask_card(card):
    response = input(card["prompt"] + " ").strip().lower()
    correct = card["answer"].lower()
    return response == correct
```

### Step 3: Run a Round

```python
def run_quiz(cards):
    score = 0
    for card in cards:
        if ask_card(card):
            print("Correct")
            score += 1
        else:
            print(f"No — expected: {card['answer']}")
    return score

# score = run_quiz(cards)
# print(f"Score: {score}/{len(cards)}")
```

### Step 4: Extensions

- Shuffle cards.
- Retry missed cards.
- Keep a session high score in a variable.
- Load cards later from a file.

This project is intentionally modest. It still touches state, loops, functions, user input, and feedback—the heartbeat of interactive software.

## Program Design Studio: Expense Categorizer

```python
CATEGORIES = {
    "food": ["grocery", "cafe", "restaurant"],
    "transport": ["bus", "train", "uber", "fuel"],
    "housing": ["rent", "utilities"],
}

def categorize(description):
    text = description.lower()
    for category, keywords in CATEGORIES.items():
        for word in keywords:
            if word in text:
                return category
    return "other"

transactions = [
    "Morning cafe latte",
    "Monthly rent payment",
    "Train pass top-up",
    "New headphones",
]

totals = {}
for tx in transactions:
    category = categorize(tx)
    totals[category] = totals.get(category, 0) + 1
print(totals)
```

Although amounts are omitted for brevity, you can extend each transaction into a dictionary with `amount` and accumulate money per category. Real personal finance scripts grow from exactly this seed.

## Reading Code: A Professional Skill

Writing is only half of programming. Reading code teaches idioms.

When reading unfamiliar code:

1. Identify inputs and outputs.
2. Find the main entry point.
3. Name the data structures.
4. Translate each function into one sentence.
5. Trace one example on paper.

Example to read:

```python
def unique_preserve_order(items):
    seen = []
    for item in items:
        if item not in seen:
            seen.append(item)
    return seen
```

One-sentence summary: return a new list with duplicates removed while keeping first-seen order. Paper trace with `["a", "b", "a", "c"]` to verify.

## Performance Intuition (Light, Practical)

Beginners should not obsess over micro-optimization, but a little intuition prevents accidental pain.

- Looping through 100 items is trivial.
- Looping through 10 million items may be slow in pure Python, depending on work per item.
- Checking `item in list` scans the list; for large membership tests, sets are better once you learn them.
- Building strings with repeated `+` in a tight loop can be inefficient; gather parts in a list and `join`.

```python
parts = []
for word in ["Python", "from", "zero"]:
    parts.append(word)
print(" ".join(parts))
```

Correctness first. Clarity second. Speed when measured necessity appears.

## Environment and Workflow Notes

As you continue beyond this lesson:

- Keep projects in folders.
- Use a consistent Python version when possible.
- Save files with `.py` extensions.
- Run scripts from a terminal with `python file.py` (or `python3` depending on your system).
- Consider notebooks for experimentation and `.py` files for reusable tools.

You do not need advanced tooling on day one. You do need a reliable run-edit-run loop.

## Extended Practice Set

### Exercise 11: Clamp and Label

Write `band(value)` that clamps a percentage to 0..100, then returns `"low"`, `"mid"`, or `"high"` using thresholds 0-39, 40-69, 70-100.

### Exercise 12: Deduplicate Names

Given a list of messy names, return cleaned unique names preserved in first-seen order.

### Exercise 13: Menu Loop

Create a menu:

1. Add item
2. List items
3. Quit

Store items in a list and keep looping until quit.

### Exercise 14: Function Decomposition

Take one of your earlier scripts and split it into at least three functions with clear names. Write one assert/test per function.

### Exercise 15: Explain a Traceback

Intentionally cause a `TypeError` and a `ValueError` in separate tiny snippets. For each, write three sentences: what you did, what Python reported, what you changed.

## Extended Answer Key Notes

### Exercise 11 Sample Idea

Clamp first, then classify with `if/elif/else`. Test edges: `-5`, `0`, `39`, `40`, `100`, `200`.

### Exercise 12 Sample Idea

Strip/title-case names; use a result list and `if cleaned not in result`.

### Exercise 13 Sample Idea

`while True` menu; `break` on quit; `append` on add; loop print on list.

### Exercise 14 Guidance

Decomposition quality matters more than identical structure. Aim for names that reveal intent.

### Exercise 15 Guidance

The goal is emotional desensitization to errors plus literal reading skill.

## Capstone Challenge: Personal Command-Line Utility

Design and build one utility from this list:

1. **Study session timer log**: record topic and minutes, summarize totals by topic.
2. **Unit converter**: miles/km, C/F, with menu and validation.
3. **CSV-lite grader**: hard-code rows as lists/dicts, compute averages and fail list.
4. **Habit tracker**: mark habits done/not done for seven days and compute completion rate.

Requirements for "done":

- at least two functions,
- one loop,
- one conditional branch,
- validated input,
- readable names,
- three manual test cases written in comments.

This capstone is the bridge from lesson exercises to self-directed building. If you complete it carefully, you will feel the difference between knowing syntax and owning a tiny tool.




## Closing Encouragement for Absolute Beginners

Every expert Python programmer once forgot a colon, mismatched quotes, confused `=` with `==`, and stared at a traceback with frustration. The difference is not talent mythology. It is repetition with reflection: write, run, read the error, adjust, and keep a growing library of tiny patterns you trust. If you practice those patterns—variables, branches, loops, and functions—on small real problems for a few weeks, Python stops feeling like a foreign language and starts feeling like a precise way to tell a computer what you mean.


## Final Summary

Python programs are precise sequences of instructions executed by an interpreter. You store and transform data with types and variables, choose paths with conditionals, repeat work with loops, and package reusable behavior with functions. Most beginner breakthroughs come not from memorizing every syntax option, but from practicing small programs, reading errors carefully, and translating clear English goals into data plus behavior.

If you can write a short script that takes input, validates it, branches, loops over a collection, and returns a structured result from a function, you have crossed the threshold from "curious about coding" to "able to build." Everything else in Python expands those same muscles.

## Next Steps

Practice daily with tiny challenges: a tip calculator, a password length checker, a grocery totaler, a flashcard quiz, or a CSV summarizer once you learn files. Then learn dictionaries deeply, study modules, and begin automating one annoying task in your own life. Programming skill grows through shipped tiny tools, not through passive reading alone.



## Module Deep Dive: From Scripts to Reliable Programs

Writing a script that works once is not the same as writing a program you can trust. Beginners often stop at the first successful run. Professionals treat the first successful run as the start of hardening.

### Inputs, Outputs, and Side Effects

Every useful program has inputs and outputs. Inputs may come from typed arguments, files, APIs, environment variables, or user prompts. Outputs may be printed text, files, database writes, or network calls. Side effects are changes the program makes outside its own memory.

A clean habit is to separate pure calculation from side effects. Pure calculation is easy to test: given the same input, it returns the same output. Side effects need careful control because they can fail for reasons outside your code.

Example: calculating a discounted price is pure. Writing that price into a CSV file is a side effect. Keep both, but do not mix them into one tangled function if you can avoid it.

### Designing Small Programs with Layers

A practical beginner architecture for many tools looks like this:

1. Parse and validate input.
2. Transform data.
3. Produce output.
4. Handle errors with clear messages.

This structure prevents the common mess where validation, calculation, printing, and file writing all happen in one long block.

### Worked Example: Expense Summarizer

Suppose you have expense lines like:

```text
food,12.50
transport,3.20
food,8.00
misc,20.00
```

A robust program should:

- skip blank lines
- reject malformed rows
- accumulate totals by category
- print a stable, sorted summary
- exit with a non-zero status if the file is unusable

That is more than a happy-path demo. It is the difference between a toy and a tool.

### Debugging as a Skill

When code fails, resist the urge to rewrite everything. Use this sequence:

1. Read the traceback from the bottom up for the first project file mentioned.
2. Reproduce the failure with the smallest input.
3. Print or inspect intermediate values around the failure.
4. Form a hypothesis.
5. Change one thing.
6. Re-run.

Guessing wildly creates new bugs on top of old ones. Debugging is controlled investigation.

### Testing Without a Framework First

Before learning pytest, write tiny check functions:

```python
def assert_equal(actual, expected, label):
    if actual != expected:
        raise AssertionError(f"{label}: expected {expected!r}, got {actual!r}")

assert_equal(normalize_category(" Food "), "food", "normalize spaces/case")
```

These checks document expected behavior and catch regressions when you refactor.

### Common Production-Minded Mistakes

- Catching all exceptions and ignoring them
- Using mutable default arguments
- Mixing tabs and spaces
- Relying on the working directory being "wherever you happened to click"
- Hardcoding machine-specific paths
- Copy-pasting the same cleaning logic into five places

### Practice Project: CSV Cleaner

Build a script that reads a messy CSV of names and emails, trims whitespace, lowercases emails, drops rows missing email, and writes `cleaned.csv`. Then add a summary of how many rows were kept and dropped. This project trains validation, transformation, file IO, and reporting together.

### Glossary Expansion

- **Deterministic**: same input yields same output
- **Idempotent action**: doing it multiple times has the same effect as doing it once
- **Contract**: what a function promises about inputs and outputs
- **Regression**: a change that breaks previously working behavior
- **Edge case**: uncommon but valid input that often breaks naive code



## Module Deep Dive: Data Structures in Real Tasks

Choosing the right structure is half of programming.

### Lists vs Dicts vs Sets

- Use lists when order and duplicates matter
- Use dicts when you look up by key
- Use sets when membership tests and uniqueness matter

Example: collecting unique tags from lessons is a set problem. Counting tag frequency is a dict problem. Showing tags in catalog order may become a list problem.

### Nested Structures

Real data is nested: a course contains modules, modules contain lessons, lessons contain quizzes. Learn to traverse nested lists/dicts carefully and validate assumptions about missing keys.

### Comprehensions with Restraint

Comprehensions are excellent for simple transformations. They become unreadable when overloaded with conditionals and side effects. If a comprehension needs a comment to explain itself, use a loop.

### File and Path Hygiene

Use `pathlib`. Pass paths explicitly. Do not assume the current working directory. Write outputs next to inputs or to a chosen output folder. These habits prevent "it works on my machine" failures.

### Mini Capstone: Quiz Score Reporter

Given quiz attempt JSON files, write a program that:

1. loads all attempts
2. validates schema
3. computes score percent per attempt
4. aggregates average score by lesson
5. prints top struggling questions by miss rate
6. writes a summary CSV

This project combines parsing, validation, aggregation, and reporting — the daily work of practical Python.

<!-- quiz:python-final -->
