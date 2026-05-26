import { Layout } from "@/components/layout";
import { Footer } from "@/components/footer";
import { Switch, Route } from "wouter";

import { Dashboard } from "@/pages/dashboard";
import { AdditivesList } from "@/pages/additives/list";
import { AdditiveDetail } from "@/pages/additives/detail";
import { ProductsList } from "@/pages/products/list";
import { ProductDetail } from "@/pages/products/detail";
import { Docs } from "@/pages/docs";
import NotFound from "@/pages/not-found";

export function AppRouter() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff]">
      <Layout>
        <div className="flex-grow">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/additives" component={AdditivesList} />
            <Route path="/additives/:id" component={AdditiveDetail} />
            <Route path="/products" component={ProductsList} />
            <Route path="/products/:id" component={ProductDetail} />
            <Route path="/docs" component={Docs} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Layout>
      <Footer />
    </div>
  );
}
