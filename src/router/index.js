import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../app/authentication/views/Login";
import Cadastro from "../app/authentication/views/Cadastro";
import Home from "../app/dashboard/views/Home";
import Customer from "@/app/dashboard/views/Customer";
import Seller from "@/app/dashboard/views/Seller";
import Punishment from "@/app/dashboard/views/Punishment";
import Loan from "@/app/dashboard/views/Loan";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/cadastro",
    name: "cadastro",
    component: Cadastro,
  },
  {
    path: "/dash/cliente",
    name: "Clientes",
    component: Customer,
  },
  {
    path: "/dash/vendedor",
    name: "Vendedores",
    component: Seller,
  },
  {
    path: "/dash/punicoes",
    name: "Punições",
    component: Punishment,
  },
  {
    path: "/dash/emprestimos",
    name: "Emprestimos",
    component: Loan,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
