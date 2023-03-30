<template>
  <v-container fill-height fluid>
    <v-row justify="center">
      <v-col cols="10">
        <v-data-table
          :headers="headers"
          :items="Loan"
          sort-by="name"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="900px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Novo empréstimo
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                            outlined
                            v-model="editedItem.number_of_installments"
                            label="Número de parcelas"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            outlined
                            v-model="editedItem.total_in_cents"
                            label="Valor emprestado"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            outlined
                            v-model="editedItem.loan_status"
                            label="Status"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            outlined
                            v-model="editedItem.due_day"
                            label="Dia do vencimento"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            outlined
                            v-model="editedItem.interest_rate"
                            label="Taxa de juros"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            outlined
                            v-model="editedItem.installment_value_in_cents"
                            label="Valor da parcela"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            outlined
                            v-model="editedItem.start_date"
                            label="Início da parcela"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-autocomplete
                            outlined
                            v-model="editedItem.id_customer"
                            label="ID Cliente"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-autocomplete
                            outlined
                            v-model="editedItem.id_setup_punishment"
                            label="ID Punição"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-autocomplete
                            outlined
                            v-model="editedItem.id_seller"
                            label="ID Vendedor"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="success" @click="save"> Salvar </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Deseja realmente apagar esse vendedor?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancelar</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="findAll"> Recarregar </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import SellerService from "@/services/seller";
import LoanService from "@/services/loan";
import PunishmentService from "@/services/punishment";
import CustomerService from "@/services/customer";

export default {
  data: () => ({
    show1: false,
    rules: {
      required: (value) => !!value || "Obrigatório.",
      min: (v) => v.length >= 8 || "Min 8 letras",
    },
    idToDelete: -1,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "id", value: "id", align: "start" },
      { text: "Número de parcelas", value: "number_of_installments" },
      { text: "Valor emprestado", value: "total_in_cents" },
      { text: "Status", value: "status" },
      { text: "Dia do vencimento", value: "due_day" },
      { text: "Taxa de juros", value: "interest_rate" },
      { text: "Valor da parcela", value: "installment_value_in_cents" },
      { text: "Início da parcela", value: "start_date" },
      { text: "Cliente", value: "id_customer.name" },
      { text: "Punição", value: "id_setup_punishment.name" },
      { text: "Vendedor", value: "id_seller.name" },
      { text: "Ação", value: "actions", sortable: false },
    ],
    Loan: [],
    Seller: [],
    Punishment: [],
    Custumer: [],
    editedIndex: -1,
    editedItem: {
      id: -1,
      number_of_installments: "",
      total_in_cents: "",
      loan_status: "",
      due_day: "",
      interest_rate: "",
      installment_value_in_cents: "",
      start_date: "",
      id_customer: "",
      id_setup_punishment: "",
      id_seller: "",
    },
    defaultItem: {
      id: -1,
      number_of_installments: "",
      total_in_cents: "",
      loan_status: "",
      due_day: "",
      interest_rate: "",
      installment_value_in_cents: "",
      start_date: "",
      id_customer: "",
      id_setup_punishment: "",
      id_seller: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo vendedor" : "Editar vendedor";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  async beforeMount() {
    await this.findAll();
  },

  methods: {
    searchCep() {
      if (this.editedItem.zipcode.length == 9) {
        axios
          .get(`https://viacep.com.br/ws/${this.editedItem.zipcode}/json/`)
          .then((response) => {
            this.editedItem.street = response.data.logradouro;
            this.editedItem.neighborhood = response.data.bairro;
          })
          .catch((error) => console.log(error));
      }
    },
    async findAll() {
      this.Loan = await LoanService.findAll();
      this.Seller = await SellerService.findAll();
      this.Punishment = await PunishmentService.findAll();
      this.Custumer = await CustomerService.findAll();
    },

    editItem(item) {
      this.editedIndex = this.Loan.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(id) {
      this.idToDelete = id;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      Loan.remove(this.idToDelete)
        .then((res) => {
          this.findAll();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.idToDelete = -1;
          this.dialogDelete = false;
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        await Loan.edit(this.editedItem.id, this.editedItem);
      } else {
        delete this.editedItem.id;
        await Loan.create(this.editedItem);
      }
      await this.findAll();
      this.close();
    },
  },
};
</script>
