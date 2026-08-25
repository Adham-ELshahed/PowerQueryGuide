# Standard Numeric Format Strings in Power Query M

When you need to turn numbers into formatted text in Power Query M, you use the `Number.ToText` function with standard numeric format strings. A standard format string takes a specific form: a single letter for the format type, followed by an optional number for precision.

**Syntax:** `[format specifier][precision specifier]`

The format specifier tells Power Query what kind of number you want, such as currency or a percentage. The precision specifier sets how many digits appear.

Here are the standard format specifiers you can use.

## Currency ("C" or "c")
Converts a number to a currency amount. The precision specifier sets the number of decimal places. The default is 2. The output changes based on your system's culture settings.

```powerquery
Number.ToText(123.456, "C2")          // Outputs $123.46 (en-US)
Number.ToText(123.456, "C2", "fr-FR") // Outputs 123,46 €
Number.ToText(-123.456, "C3")         // Outputs ($123.456)
```

## Decimal ("D" or "d")
Converts an integer to a string of decimal digits. A minus sign appears automatically if the number is negative. This format only works with integer types. The precision specifier sets the minimum number of digits. Power Query pads the number with zeroes on the left if your number has fewer digits than your specifier requires.

```powerquery
Number.ToText(1234, "D")              // Outputs 1234
Number.ToText(1234, "D6")             // Outputs 001234
Number.ToText(-1234, "D6")            // Outputs -001234
```

## Exponential ("E" or "e")
Converts a number to scientific notation. The precision specifier sets the number of digits after the decimal point. The default is 6 digits.

```powerquery
Number.ToText(1052.032, "E")          // Outputs 1.052032E+003
Number.ToText(1052.032, "e2")         // Outputs 1.05e+003
```

## Fixed-point ("F" or "f")
Converts a number to a standard decimal format. The precision specifier controls the number of decimal places. 

```powerquery
Number.ToText(1234.567, "F")          // Outputs 1234.57 (rounds up)
Number.ToText(1234, "F1")             // Outputs 1234.0
Number.ToText(-1234.56, "F4")         // Outputs -1234.5600
```

## General ("G" or "g")
Returns the most compact format, picking between fixed-point or scientific notation based on the number size. The precision specifier dictates the total number of significant digits.

```powerquery
Number.ToText(123.4546, "G4")         // Outputs 123.5
Number.ToText(-1.23456789e-25, "G")   // Outputs -1.23456789E-25
```

## Number ("N" or "n")
Converts a number to a string with group separators (like commas for thousands) and a decimal point. The precision specifier sets the number of decimal places.

```powerquery
Number.ToText(1234.567, "N")          // Outputs 1,234.57
Number.ToText(1234.567, "N1")         // Outputs 1,234.6
Number.ToText(1234.567, "N", "ru-RU") // Outputs 1 234,57
```

## Percent ("P" or "p")
Multiplies the number by 100 and adds a percentage symbol. The precision specifier determines the number of decimal places.

```powerquery
Number.ToText(1, "P")                 // Outputs 100.00 %
Number.ToText(-0.39678, "P1")         // Outputs -39.7 %
```

## Hexadecimal ("X" or "x")
Converts an integer to a hexadecimal string. The precision specifier sets the minimum number of digits, padding the string with leading zeroes if necessary.

```powerquery
Number.ToText(255, "X")               // Outputs FF
Number.ToText(255, "x4")              // Outputs 00ff
```
