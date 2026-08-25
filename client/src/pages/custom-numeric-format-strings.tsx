import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function CustomNumericFormatStrings() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const specifiers = [
    {
      name: 'The "0" Specifier (Zero Placeholder)',
      description: (
        <>
          <p className="mb-4">
            Replaces the zero with the corresponding digit if one is present; otherwise, zero appears in the result string. The position of the leftmost zero before the decimal point and the rightmost zero after the decimal point determines the range of digits that are always present in the result string.
          </p>
          <p className="mb-4">
            The <code className="font-mono font-semibold text-sm">"00"</code> specifier causes the value to be rounded to the nearest digit preceding the decimal, where rounding away from zero is always used. For example, formatting 34.5 with <code className="font-mono font-semibold text-sm">"00"</code> results in the value 35.
          </p>
        </>
      ),
      example: `let Source = {\n  Number.ToText(123, "00000", ""),           // Displays 00123\n  Number.ToText(1.2, "0.00", ""),            // Displays 1.20\n  Number.ToText(1.2, "00.00", "da-DK"),      // Displays 01,20\n  Number.ToText(.56, "0.0", ""),             // Displays 0.6\n  Number.ToText(1234567890, "0,0", ""),      // Displays 1,234,567,890\n  Number.ToText(1234567890.12, "0,0.0", "")  // Displays 1,234,567,890.1\n} in Source`,
    },
    {
      name: 'The "#" Specifier (Digit Placeholder)',
      description: (
        <>
          <p className="mb-4">
            Replaces the <code className="font-mono font-semibold text-sm">"#"</code> symbol with the corresponding digit if one is present; otherwise, no digit appears in the result string. Note that this specifier never displays a zero that isn't a significant digit, even if zero is the only digit in the string.
          </p>
          <p className="mb-4">
            To return a result string in which absent digits or leading zeroes are replaced by spaces, use <code className="font-mono font-semibold text-sm">Text.PadStart</code>.
          </p>
        </>
      ),
      example: `let Source = {\n  Number.ToText(1.2, "#.##", ""),           // Displays 1.2\n  Number.ToText(123, "#####"),              // Displays 123\n  Number.ToText(123456, "[##-##-##]"),      // Displays [12-34-56]\n  Number.ToText(1234567890, "(###) ###-####") // Displays (123) 456-7890\n} in Source\n\n// Replacing absent digits with spaces:\nText.Format("The value is: '#{0}'", {Text.PadStart(Number.ToText(.324, "#.###"), 5)})\n// Displays: The value is: ' .324'`,
    },
    {
      name: 'The "." Specifier (Decimal Point)',
      description: (
        <>
          <p className="mb-4">
            Determines the location of the decimal separator in the result string. The first period in the format string determines the location; any additional periods are ignored. If the format specifier ends with a <code className="font-mono font-semibold text-sm">"."</code>, only the significant digits are formatted into the result string. The character used as the decimal separator is determined by the culture.
          </p>
        </>
      ),
      example: `let Source = {\n  Number.ToText(1.2, "0.00", ""),         // Displays 1.20\n  Number.ToText(1.2, "00.00", "da-DK"),   // Displays 01,20\n  Number.ToText(.086, "#0.##%", ""),      // Displays 8.6%\n  Number.ToText(86000, "0.###E+0", "")    // Displays 8.6E+4\n} in Source`,
    },
    {
      name: 'The "," Specifier (Group Separator and Number Scaling)',
      description: (
        <>
          <p className="mb-2">The comma character serves two distinct purposes depending on placement:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Group separator:</strong> If one or more commas are specified between two digit placeholders (0 or #) that format integral digits, a localized group separator character is inserted between each number group.
            </li>
            <li>
              <strong>Number scaling specifier:</strong> If one or more commas are specified immediately to the left of the explicit or implicit decimal point, the number to be formatted is divided by 1000 for each comma.
            </li>
          </ul>
        </>
      ),
      example: `let Source = {\n  // Group Separator:\n  Number.ToText(1234567890, "#,#", ""),     // Displays 1,234,567,890\n\n  // Number Scaling:\n  Number.ToText(1234567890, "#,,", ""),     // Displays 1235 (divided by 1,000,000)\n  Number.ToText(1234567890, "#,,,", ""),    // Displays 1 (divided by 1,000,000,000)\n\n  // Using both together:\n  Number.ToText(1234567890, "#,##0,,", "")  // Displays 1,235\n} in Source`,
    },
    {
      name: 'The "%" Specifier (Percentage Placeholder)',
      description: (
        <p className="mb-4">
          A percent sign in a format string causes a number to be multiplied by 100 before it's formatted. The localized percent symbol is inserted in the number at the exact location where the <code className="font-mono font-semibold text-sm">%</code> appears in the format string.
        </p>
      ),
      example: `let Source = {\n  Number.ToText(0.3697, "%#0.00", "en-US"), // Displays %36.97\n  Number.ToText(0.3697, "##.0 %", "en-US"), // Displays 37.0 %\n  Number.ToText(0.3697, "##.0 %", "el-GR")  // Displays 37,0 %\n} in Source`,
    },
    {
      name: 'The "‰" Specifier (Per Mille Placeholder)',
      description: (
        <p className="mb-4">
          A per mille character in a format string causes a number to be multiplied by 1000 before it's formatted. The appropriate localized per mille symbol is inserted in the returned string at the location where the <code className="font-mono font-semibold text-sm">‰</code> appears in the format string.
        </p>
      ),
      example: `let Source = {\n  Number.ToText(0.03697, "#0.00‰", "en-US"), // Displays 36.97‰\n  Number.ToText(0.03697, "#0.00‰", "ru-RU")  // Displays 36,97‰\n} in Source`,
    },
    {
      name: 'Exponential Notation ("E" and "e")',
      description: (
        <p className="mb-4">
          If any of the strings <code className="font-mono font-semibold text-sm">"E0", "E+0", "E-0", "e0", "e+0", "e-0"</code> are present in the format string, and are followed immediately by at least one zero, the number is formatted using scientific notation. The number of zeros dictates the minimum number of digits in the exponent. A plus sign (+) indicates a sign character always precedes the exponent, while a minus sign (-) indicates only negative exponents receive a sign.
        </p>
      ),
      example: `let Source = {\n  Number.ToText(987654, "#0.0e0"),          // Displays 98.8e4\n  Number.ToText(1503.92311, "0.0##e+00"),   // Displays 1.504e+03\n  Number.ToText(1.8901385E-16, "0.0e+00")   // Displays 1.9e-16\n} in Source`,
    },
    {
      name: 'Escape Characters ("\\")',
      description: (
        <p className="mb-4">
          The <code className="font-mono font-semibold text-sm">#</code>, <code className="font-mono font-semibold text-sm">0</code>, <code className="font-mono font-semibold text-sm">.</code>, <code className="font-mono font-semibold text-sm">,</code>, <code className="font-mono font-semibold text-sm">%</code>, and <code className="font-mono font-semibold text-sm">‰</code> symbols in a format string are interpreted as format specifiers rather than as literal characters. Depending on their position, the uppercase and lowercase <code className="font-mono font-semibold text-sm">E</code> as well as the <code className="font-mono font-semibold text-sm">+</code> and <code className="font-mono font-semibold text-sm">-</code> symbols may also be interpreted as formatting rules. To prevent a character from being interpreted as a format specifier, precede it with a backslash (<code className="font-mono font-semibold text-sm">\</code>).
        </p>
      ),
      example: `let Source = {\n  Number.ToText(987654, "\\###00\\#") // Displays #987654#\n} in Source`,
    },
    {
      name: 'Literal Strings and Other Characters',
      description: (
        <p className="mb-4">
          To indicate that enclosed characters should be copied to the result string unchanged, enclose them in either single quotes (<code className="font-mono font-semibold text-sm">'string'</code>) or double quotes (<code className="font-mono font-semibold text-sm">""string""</code>). All other unassigned characters are automatically copied to the result string as literals.
        </p>
      ),
      example: `let Source = {\n  Number.ToText(68, "# 'degrees'"),  // Displays 68 degrees\n  Number.ToText(68, "# °")           // Displays 68 °\n} in Source`,
    },
    {
      name: 'The ";" Section Separator',
      description: (
        <>
          <p className="mb-4">
            The semicolon character is used to separate format strings into distinct sections for positive, negative, and zero numbers. 
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>One section:</strong> The format string applies to all values.</li>
            <li><strong>Two sections:</strong> The first section applies to positive values and zeros; the second applies to negative values.</li>
            <li><strong>Three sections:</strong> The first applies to positive values, the second to negative values, and the third to zeros.</li>
          </ul>
        </>
      ),
      example: `let Source = {\n  // Three sections: positive;negative;zero\n  Number.ToText(12.345, "#0.0#;(#0.0#);-\\0-"),  // Displays 12.35\n  Number.ToText(-12.345, "#0.0#;(#0.0#);-\\0-"), // Displays (12.35)\n  Number.ToText(0, "#0.0#;(#0.0#);-\\0-"),       // Displays -0-\n\n  // Two sections: positive & zero;negative\n  Number.ToText(12.345, "#0.0#;(#0.0#)"),       // Displays 12.35\n  Number.ToText(0, "#0.0#;(#0.0#)"),            // Displays 0.0\n  Number.ToText(-12.345, "#0.0#;(#0.0#)")       // Displays (12.35)\n} in Source`,
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
                <h1 className="text-3xl font-bold">Custom Numeric Format Strings</h1>
                <Badge variant="outline">Format Guide</Badge>
              </div>
              <p className="text-lg text-ms-gray-secondary leading-relaxed">
                You can create a custom numeric format string, which consists of one or more custom numeric specifiers, to define how to format numeric data. A custom numeric format string is any format string that isn't a standard numeric format string.
              </p>
            </div>

            {/* Specifiers */}
            <h2 className="text-2xl font-bold mb-4">Custom Format Specifiers</h2>
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