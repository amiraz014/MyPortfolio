---
title: Golangg
date: 2025-01-15
tags:
  - golang
---

Why GO ?


![[RxCpanC.png]]


# The Compilation Process

Computers need machine code, they don't understand English or even Go. We need to convert our high-level (Go) code into machine language, which is really just a set of instructions that some specific hardware can understand. In your case, your CPU.

The Go compiler's job is to take Go code and produce machine code, an `.exe` file on Windows or a standard executable on Mac/Linux.

![[gorfR5MNc.png]]



## Go program structure

We'll go over this all later in more detail, but to sate your curiosity:

1. `package main` lets the Go compiler know that we want this code to compile and run as a standalone program, as opposed to being a library that's imported by other programs.
2. `import "fmt"` imports the [`fmt` (formatting) package](https://pkg.go.dev/fmt) from the [standard library](https://pkg.go.dev/std). It allows us to use `fmt.Println` to print to the console.
3. `func main()` defines the `main` function, the entry point for a Go program.

## Two kinds of bugs

Generally speaking, there are two kinds of errors in programming:

1. **Compilation errors.** Occur when code is compiled. It's generally better to have compilation errors because they'll never accidentally make it into production. You can't ship a program with a compiler error because the resulting executable won't even be created.
2. **Runtime errors.** Occur when a program is running. These are generally worse because they can cause your program to crash or behave unexpectedly.



# Compiled vs Interpreted

You can run a compiled program _without_ the original source code. You don't need the compiler anymore after it's done its job. That's how most videogames are distributed! Players don't need to install the correct version of `python` to run a PC game: they just download the executable game and run it.

![compiler vs interpreter](https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/7RBQRNA.png)

With interpreted languages like Python and Ruby, the code is interpreted at [runtime](https://en.wikipedia.org/wiki/Runtime_(program_lifecycle_phase)) by a separate program known as the "interpreter". Distributing code for users to run can be a pain because they need to have an interpreter installed, and they need access to the source code.

## Examples of compiled languages

- Go
- C
- C++
- Rust

## Examples of interpreted languages

- JavaScript (sometimes JIT-compiled, but a similar concept)
- Python
- Ruby


# Small memory footprint

Go programs are fairly lightweight. Each program includes a small amount of extra code that's included in the executable binary called the [Go Runtime](https://go.dev/doc/faq#runtime). One of the purposes of the Go runtime is to clean up unused memory at runtime. It includes a [garbage collector](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) that automatically frees up memory that's no longer in use.

## Comparison

As a general rule, Java programs use _more_ memory than comparable Go programs. There are several reasons for this, but one of them is that Java uses a virtual machine to interpret bytecode at runtime and typically allocates more on the [heap](https://courses.grainger.illinois.edu/cs225/fa2022/resources/stack-heap/).

On the other hand, Rust and C programs use slightly _less_ memory than Go programs because more control is given to the developer to optimize the memory usage of the program. The Go runtime just handles it for us automatically.

## Idle memory usage

![idle memory](https://miro.medium.com/max/1400/1*Ggs-bJxobwZmrbfuoWGpFw.png)

In the chart above, [Dexter Darwich compares the memory usage](https://medium.com/@dexterdarwich/comparison-between-java-go-and-rust-fdb21bd5fb7c) of three _very_ simple programs written in Java, Go, and Rust. As you can see, Go and Rust use _very_ little memory when compared to Java.


# The initial statement of an if block

An `if` conditional can have an "initial" statement. The variable(s) created in the initial statement are _only_ defined within the scope of the `if` body.

```go
if INITIAL_STATEMENT; CONDITION {
}
```

## Why would I use this?

It has two valuable purposes:

1. It's a bit shorter
2. It limits the scope of the initialized variable(s) to the `if` block

For example, instead of writing:

```go
length := getLength(email)
if length < 1 {
    fmt.Println("Email is invalid")
}
```

We can do:

```go
if length := getLength(email); length < 1 {
    fmt.Println("Email is invalid")
}
```
 
 In the example above, `length` isn't available in the parent scope, which is nice because we don't need it there - we won't accidentally use it elsewhere in the function.


# Functions

Functions in Go can take zero or more arguments.

To make code easier to read, the variable type comes _after_ the variable name.

For example, the following function:

```go
func sub(x int, y int) int {
  return x-y
}
```



Accepts two integer parameters and returns another integer.

Here, `func sub(x int, y int) int` is known as the "function signature".


# Guard clauses provide a linear approach to logic trees

## Early Returns

Go supports the ability to return early from a function. This is a powerful feature that can clean up code, especially when used as guard clauses.

Guard Clauses leverage the ability to `return` early from a function (or `continue` through a loop) to make nested conditionals one-dimensional. Instead of using if/else chains, we just return early from the function at the end of each conditional block.

```go
func divide(dividend, divisor int) (int, error) {
	if divisor == 0 {
		return 0, errors.New("Can't divide by zero")
	}
	return dividend/divisor, nil
}
```


Error handling in Go naturally encourages developers to make use of guard clauses. When I started writing more JavaScript, I was disappointed to see how many nested conditionals existed in the code I was working on.

Let’s take a look at an exaggerated example of nested conditional logic:

```go
func getInsuranceAmount(status insuranceStatus) int {
  amount := 0
  if !status.hasInsurance(){
    amount = 1
  } else {
    if status.isTotaled(){
      amount = 10000
    } else {
      if status.isDented(){
        amount = 160
        if status.isBigDent(){
          amount = 270
        }
      } else {
        amount = 0
      }
    }
  }
  return amount
}
```

This could be written with guard clauses instead:

```go
func getInsuranceAmount(status insuranceStatus) int {
  if !status.hasInsurance(){
    return 1
  }
  if status.isTotaled(){
    return 10000
  }
  if !status.isDented(){
    return 0
  }
  if status.isBigDent(){
    return 270
  }
  return 160
}
```

The example above is _much_ easier to read and understand. When writing code, it’s important to try to reduce the cognitive load on the reader by reducing the number of entities they need to think about at any given time.

In the first example, if the developer is trying to figure out when `270` is returned, they need to think about each branch in the logic tree and try to remember which cases matter and which cases don’t. With the one-dimensional structure offered by guard clauses, it’s as simple as stepping through each case in order.



# Functions as values

Go supports [first-class](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function) and higher-order functions, which are just fancy ways of saying "functions as values". Functions are just another type -- like `int`s and `string`s and `bool`s.

Let's assume we have two simple functions:

```go
func add(x, y int) int {
	return x + y
}

func mul(x, y int) int {
	return x * y
}
```


We can create a new `aggregate` function that accepts a function as its 4th argument:

```go
func aggregate(a, b, c int, arithmetic func(int, int) int) int {
  firstResult := arithmetic(a, b)
  secondResult := arithmetic(firstResult, c)
  return secondResult
}
```

It calls the given `arithmetic` function (which could be `add` or `mul`, or any other function that accepts two `int`s and returns an `int`) and applies it to three inputs instead of two. It can be used like this:

```go
func main() {
	sum := aggregate(2, 3, 4, add)
	// sum is 9
	product := aggregate(2, 3, 4, mul)
	// product is 24
}
```

# Anonymous Functions

Anonymous functions are true to form in that they have _no name_. They're useful when defining a function that will only be used once or to create a quick [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)).

Let's say we have a function `conversions` that accepts another function, `converter` as input:

```go
func conversions(converter func(int) int, x, y, z int) (int, int, int) {
	convertedX := converter(x)
	convertedY := converter(y)
	convertedZ := converter(z)
	return convertedX, convertedY, convertedZ
}
```


We _could_ define a function normally and then pass it in by name... but it's usually easier to just define it anonymously:

```go
func double(a int) int {
    return a + a
}

func main() {
    // using a named function
	newX, newY, newZ := conversions(double, 1, 2, 3)
	// newX is 2, newY is 4, newZ is 6

    // using an anonymous function
	newX, newY, newZ = conversions(func(a int) int {
	    return a * a
	}, 1, 2, 3)
	// newX is 1, newY is 4, newZ is 9
}
```



Please check [[Advanced GO Concepts  ]] 

# Defer

The `defer` keyword is a fairly unique feature of Go. It allows a function to be executed automatically _just before_ its enclosing function returns. The deferred call's arguments are evaluated immediately, but the function call is not executed until the surrounding function returns.

Deferred functions are typically used to clean up resources that are no longer being used. Often to close database connections, file handlers and the like.

For example:

```go
func GetUsername(dstName, srcName string) (username string, err error) {
	// Open a connection to a database
	conn, _ := db.Open(srcName)

	// Close the connection *anywhere* the GetUsername function returns
	defer conn.Close()

	username, err = db.FetchUser()
	if err != nil {
		// The defer statement is auto-executed if we return here
		return "", err
	}

	// The defer statement is auto-executed if we return here
	return username, nil
}
```


In the above example, the `conn.Close()` function is not called here:

```go
defer conn.Close()
```

It's called:

```go
// here
return "", err
// or here
return username, nil
```


Depending on whether the `FetchUser` function errored. (We'll cover errors later).

Defer is a great way to **make sure** that something happens before a function exits, even if there are multiple return statements, a common occurrence in Go.



