---
{
  "slug": "factory-pattern",
  "title": "Factory Pattern: Building Flexible Component Systems",
  "excerpt": "How the Factory Pattern brings flexibility to React component trees and lets you swap implementations without touching consumer code.",
  "tags": ["react", "design-patterns", "architecture", "javascript"],
  "published": true,
  "published_at": "2026-09-15T08:00:00.000Z",
  "cover_image_url": "/Images/factory-pattern-cover.png",
  "translations": [
    {
      "language": "en",
      "title": "Factory Pattern: Building Flexible Component Systems",
      "excerpt": "How the Factory Pattern brings flexibility to React component trees and lets you swap implementations without touching consumer code."
    },
    {
      "language": "fa",
      "title": "الگوی فکتوری: ساخت سیستم‌های کامپوننت‌ Flexibles",
      "excerpt": "چگونه الگوی فکتوری انعطاف‌پذیری به درخت‌های کامپوننت ری‌اکت می‌بخشد و به شما اجازه می‌دهد پیاده‌سازی‌ها را بدون لمس کد مصرف‌کننده تعویض کنید."
    },
    {
      "language": "ar",
      "title": "نمط المصنع: بناء أنظمة مكوّنات مرنة",
      "excerpt": "كيف يضيف نمط المصنع مرونة إلى شجرات مكوّنات React ويتيح لك استبدال التنفيذات دون المساس بالكود المستهلك."
    },
    {
      "language": "tr",
      "title": "Factory Pattern: Esnek Bileşen Sistemleri Oluşturma",
      "excerpt": "Factory Pattern, React bileşen ağaçlarına esneklik getirir ve tüketici kodunu değiştirmeden uygulamaları değiştirmenizi sağlar."
    }
  ]
}
---

# Factory Pattern: Building Flexible Component Systems

> The Factory Pattern is one of the oldest and most widely used creational
> patterns. It encapsulates object creation, letting you swap
> implementations without changing the code that consumes them.

## When to Reach for a Factory

A factory shines when a caller needs an object but shouldn't depend on
*which* concrete class fulfills the request. On the frontend this usually
means your components need to render **different variants** based on data
that only becomes available at runtime — and you want to keep that
decision isolated from the rendering layer itself.

### Real-world examples

- **Payment gateway**: render a PayPal button or a Stripe Checkout
  depending on the customer's region.
- **Theme variants**: a `Card` component that looks different in the
  "compact" vs "detailed" view mode.
- **Feature flags**: swap between `MarkdownRenderer` and a full MDX
  renderer without touching the article shell.

## The Core Pattern

```ts
interface PaymentGateway {
  name: string;
  render: () => JSX.Element;
}

class StripeGateway implements PaymentGateway {
  name = "stripe";
  render() {
    return <StripeCheckoutButton />;
  }
}

class PayPalGateway implements PaymentGateway {
  name = "paypal";
  render() {
    return <PayPalButton />;
  }
}

// The factory — callers never touch the concrete classes.
function paymentGatewayFactory(method: "stripe" | "paypal"): PaymentGateway {
  switch (method) {
    case "stripe":
      return new StripeGateway();
    case "paypal":
      return new PayPalGateway();
    default:
      throw new Error(`Unknown payment method: ${method}`);
  }
}
```

The key insight: the caller receives a `PaymentGateway` interface, not a
concrete class. Adding a new provider never touches the component that
uses the factory.

## React and the Factory Pattern

In React, you typically implement this as a **component map** rather than
a switch inside conditional rendering:

```tsx
const ComponentMap = {
  stripe: StripeButton,
  paypal: PayPalButton,
  applePay: ApplePayButton,
};

function PaymentButton({ method }: { method: keyof typeof ComponentMap }) {
  const Component = ComponentMap[method];
  if (!Component) return <ErrorFallback>Unsupported method</ErrorFallback>;
  return <Component />;
}
```

### Abstract Factory variant

For complex UIs that need families of related components (e.g. a complete
dashboard theme with headers, cards, and widgets), the **Abstract Factory**
gives you a coherent set of variants:

```ts
interface DashboardTheme {
  Header: React.FC;
  Card: React.FC;
  Widget: React.FC;
}

const themes: Record<"light" | "dark", DashboardTheme> = {
  light: { Header: LightHeader, Card: LightCard, Widget: LightWidget },
  dark: { Header: DarkHeader, Card: DarkCard, Widget: DarkWidget },
};

function ThemedDashboard({ theme }: { theme: "light" | "dark" }) {
  const components = themes[theme];
  return (
    <components.Header>
      <components.Card>
        <components.Widget />
      </components.Card>
    </components.Header>
  );
}
```

## Why This Matters for Component Libraries

The Factory Pattern aligns beautifully with the **design-system** approach
this site already uses: `Header`, `Card`, `Button` — each is a stable
interface, and concrete implementations are selected at the composition
root. When you need to swap `MarkdownRenderer` (the custom parser) for a
full MDX-based one, you don't touch the article shell — you just change
what the factory returns.

---

*Esmaeil Jafari — Frontend Developer, React, Next.js, and modern web technologies.*
