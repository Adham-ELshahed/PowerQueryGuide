import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function StandardNumericFormatStrings() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const specifiers = [
    {
      name: 'Currency ("C" or "c")',
      description: (
        <>
          <p className="mb-2"><strong>Result:</strong> A currency value.</p>
          <p className="mb-2"><strong>Supported by:</strong> All numeric types.</p>
          <p className="mb-2"><strong>Precision specifier:</strong> Desired number of decimal places.</p>
          <p className="mb-4"><strong>Default precision:</strong> Defined by the culture (usually 2).</p>
          <p className="mb-4">
            If the value to be formatted has more than the specified or default number of decimal places, the fractional value is rounded. If the value to the right of the specified decimal places is 5 or greater, the last digit is rounded away from zero. The formatting information of the current culture affects the result string.
          </p>
        </>
      ),
      example: `let Source = {\n  Number.ToText(12345.6789, "C"),\n  Number.ToText(12345.6789, "C3"),\n  Number.ToText(12345.6789, "C3", "da-DK")\n} in Source\n\n// Examples (assuming en-US culture):\n// $12,345.68\n// $12,345.679\n// 12.345,679 kr.`,
    },
    {
      name: 'Decimal ("D" or "d")',
      description: (
        <>
          <p className="mb-2"><strong>Result:</strong> Integer digits with optional negative sign.</p>
          <p className="mb-2"><strong>Supported by:</strong> Integral types only.</p>
          <p className="mb-2"><strong>Precision specifier:</strong> Minimum number of digits.</p>
          <p className="mb-4"><strong>Default precision:</strong> Minimum number of digits required.</p>
          <p className="mb-4">
            Converts a number to a string of decimal digits (0-9), prefixed by a minus sign if the number is negative. If required, the number is padded with zeros to its left to produce the number of digits given by the precision specifier.
          </p>
        </>
      ),
      example: `let Source = {\n  Number.ToText(12345, "D"),   // Displays 12345\n  Number.ToText(12345, "D8"),  // Displays 00012345\n  Number.ToText(-12345, "D"),  // Displays -12345\n  Number.ToText(-12345, "D8")  // Displays -00012345\n} in Source`,
    },
    {
      name: 'Exponential ("E" or "e")',
      description: (
        <>
          <p className="mb-2"><strong>Result:</strong> Exponential (scientific) notation.</p>
          <p className="mb-2"><strong>Supported by:</strong> All numeric types.</p>
          <p className="mb-2"><strong>Precision specifier:</strong> Number of decimal digits.</p>
          <p className="mb-4"><strong>Default precision:</strong> 6.</p>
          <p className="mb-4">
            Converts a number to a string of the form "-d.ddd...E+ddd" or "-d.ddd...e+ddd", where each "d" indicates a digit (0-9). The string starts with a minus sign if the number is negative. Exactly one digit always precedes the decimal point. The case of the format specifier indicates whether to prefix the exponent with an "E" or an "e". The exponent always consists of a plus or minus sign and a minimum of three digits.
          </p>
        </>
      ),
      example: `let Source = {\n  Number.ToText(12345.6789, "E", ""),      // Displays 1.234568E+004\n  Number.ToText(12345.6789, "E10", ""),    // Displays 1.2345678900E+004\n  Number.ToText(12345.6789, "e4", ""),     // Displays 1.2346e+004\n  Number.ToText(12345.6789, "E", "fr-FR")  // Displays 1,234568E+004\n} in Source`,
    },
    {
      name: 'Fixed-point ("F" or "f")',
      description: (
        <>
          <p className="mb-2"><strong>Result:</strong> Integral and decimal digits with optional negative sign.</p>
          <p className="mb-2"><strong>Supported by:</strong> All numeric types.</p>
          <p className="mb-2"><strong>Precision specifier:</strong> Number of decimal digits.</p>
          <p className="mb-4"><strong>Default precision:</strong> Defined by the culture (usually 2).</p>
          <p className="mb-4">
            Converts a number to a string of the form "-ddd.ddd..." where each "d" indicates a digit (0-9). The string starts with a minus sign if the number is negative.
          </p>
        </>
      ),
      example: `let Source = {\n  Number.ToText(1234.567, "F", "en-US"),  // Displays 1234.57\n  Number.ToText(1234.567, "F", "de-DE"),  // Displays 1234,57\n  Number.ToText(1234, "F1", "en-US"),     // Displays 1234.0\n  Number.ToText(-1234.56, "F4", "en-US")  // Displays -1234.5600\n} in Source`,
    },
    {
      name: 'General ("G" or "g")',
      description: (
        <>
          <p className="mb-2"><strong>Result:</strong> The more compact of either fixed-point or scientific notation.</p>
          <p className="mb-2"><strong>Supported by:</strong> All numeric types.</p>
          <p className="mb-2"><strong>Precision specifier:</strong> Number of significant digits.</p>
          <p className="mb-4"><strong>Default precision:</strong> Depends on numeric type.</p>
        </>
      ),
      example: `let Source = {\n  Number.ToText(-123.456, "G", "en-US"),        // Displays -123.456\n  Number.ToText(123.4546, "G4", "en-US"),       // Displays 123.5\n  Number.ToText(-1.234567890e-25, "G", "en-US") // Displays -1.23456789E-25\n} in Source`,
    },
    {
      name: 'Number ("N" or "n")',
      description: (
        <>
          <p className="mb-2"><strong>Result:</strong> Integral and decimal digits, group separators, and a decimal separator with optional negative sign.</p>
          <p className="mb-2"><strong>Supported by:</strong> All numeric types.</p>
          <p className="mb-2"><strong>Precision specifier:</strong> Desired number of decimal places.</p>
          <p className="mb-4"><strong>Default precision:</strong> Defined by the culture.</p>
        </>
      ),
      example: `let Source = {\n  Number.ToText(1234.567, "N", "en-US"), // Displays 1,234.57\n  Number.ToText(1234.567, "N", "ru-RU"), // Displays 1 234,57\n  Number.ToText(1234, "N1", "en-US"),    // Displays 1,234.0\n  Number.ToText(-1234.56, "N3", "en-US") // Displays -1,234.560\n} in Source`,
    },
    {
      name: 'Percent ("P" or "p")',
      description: (
        <>
          <p className="mb-2"><strong>Result:</strong> Number multiplied by 100 and displayed with a percent symbol.</p>
          <p className="mb-2"><strong>Supported by:</strong> All numeric types.</p>
          <p className="mb-2"><strong>Precision specifier:</strong> Desired number of decimal places.</p>
          <p className="mb-4"><strong>Default precision:</strong> Defined by the culture.</p>
        </>
      ),
      example: `let Source = {\n  Number.ToText(1, "P", "en-US"),         // Displays 100.00 %\n  Number.ToText(1, "P", "fr-FR"),         // Displays 100,00 %\n  Number.ToText(-0.39678, "P1", "en-US")  // Displays -39.7 %\n} in Source`,
    },
    {
      name: 'Hexadecimal ("X" or "x")',
      description: (
        <>
          <p className="mb-2"><strong>Result:</strong> A hexadecimal string.</p>
          <p className="mb-2"><strong>Supported by:</strong> Integral types only.</p>
          <p className="mb-2"><strong>Precision specifier:</strong> Number of digits in the result string.</p>
          <p className="mb-4"><strong>Default precision:</strong> Minimum number of digits required.</p>
          <p className="mb-4">
            The case of the format specifier indicates whether to use uppercase or lowercase characters for hexadecimal digits that are greater than 9.
          </p>
        </>
      ),
      example: `let Source = {\n  Number.ToText(255, "X"),   // Displays FF\n  Number.ToText(-1, "x"),    // Displays ff\n  Number.ToText(255, "x4"),  // Displays 00ff\n  Number.ToText(-1, "X4")    // Displays 00FF\n} in Source`,
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <div className="flex">
        <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

        <main className="ml-0 lg:ml-280 flex-1 min-h-screen px-4 lg:px-0">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link
                href="/function/Number.ToText"
                className="text-ms-blue hover:underline flex items-center gap-2 text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Number.ToText
              </Link>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold">Standard Numeric Format Strings</h1>
                <Badge variant="outline">Format Guide</Badge>
              </div>
              <p className="text-lg text-ms-gray-secondary leading-relaxed">
                Standard numeric format strings format common numeric types using the{" "}
                <code className="font-mono font-semibold text-sm">Number.ToText</code> function. A standard
                format string consists of a single alphabetic character (format specifier) followed
                by an optional integer (precision specifier). Any format string that contains more than one alphabetic character, including white space, is interpreted as a custom numeric format string.
              </p>
            </div>

            {/* Syntax Overview */}
            <Card className="mb-6 border-ms-blue/30">
              <CardHeader>
                <CardTitle>Syntax Structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-ms-gray-secondary">
                  A standard numeric format string takes the form <code className="font-mono font-semibold text-sm">[format specifier][precision specifier]</code>.
                </p>
                <CodeBlock code={`Number.ToText(123.456, "C2") // Displays $123.46 (in en-US)`} />
              </CardContent>
            </Card>

            {/* Padding Note */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Padding and Alignment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-ms-gray-secondary">
                  The precision specifier only controls the number of digits or decimal places in the result string. To pad a result string with leading or trailing spaces (or other characters) to achieve a specific width, you must use the <code className="font-mono font-semibold text-sm">Text.PadStart</code> and <code className="font-mono font-semibold text-sm">Text.PadEnd</code> functions.
                </p>
                <CodeBlock code={`let\n  amounts = {16305.32, 18794.16},\n  result = Text.Format(\n    " Beginning Balance      Ending Balance#(cr,lf) #{0}#{1}",\n    {\n      Text.PadEnd(Number.ToText(amounts{0}, "C2"), 28),\n      Text.PadStart(Number.ToText(amounts{1}, "C2"), 14)\n    }\n  )\nin\n  result\n\n// Displays:\n// Beginning Balance      Ending Balance\n// $16,305.32             $18,794.16`} />
              </CardContent>
            </Card>

            {/* Specifiers */}
            <h2 className="text-2xl font-bold mb-4 mt-8">Standard Format Specifiers</h2>
            <div className="space-y-6">
              {specifiers.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-ms-gray-secondary">{item.description}</div>
                    <CodeBlock code={item.example} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}