<template>
  <v-container fill-height fluid>
    <v-row justify="center">
      <v-col cols="10">
        <v-data-table
            :headers="headers"
            :items="sellers"
            sort-by="name"
            class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
                flat
            >
              <v-spacer></v-spacer>
              <v-dialog
                  v-model="dialog"
                  max-width="900px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                  >
                    Novo vendedor
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
                          <v-text-field outlined
                                        v-model="editedItem.name"
                                        label="Nome"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field outlined
                                        v-model="editedItem.cpf_cnpj"
                                        label="CPF/CNPJ"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field outlined
                                        v-model="editedItem.email"
                                        label="Email"
                          />
                        </v-col>
                        <v-col
                            cols="12"
                            md="6"
                        >
                          <v-text-field
                              outlined
                              v-model="editedItem.password"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[rules.required, rules.min]"
                              :type="show1 ? 'text' : 'password'"
                              name="input-10-1"
                              label="Senha"
                              counter
                              @click:append="show1 = !show1"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field outlined
                                        v-model="editedItem.phone" v-mask="'(##) 9 ####-####'"
                                        label="Telefone"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field outlined
                                        v-model="editedItem.zipcode"
                                        label="CEP" @keyup="searchCep()"
                                        append-icon="mdi-map-search" v-mask="'#####-###'"

                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field outlined
                                        v-model="editedItem.street"
                                        label="Logradouro"
                                        disabled
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field outlined
                                        v-model="editedItem.number"
                                        label="Numero"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field outlined
                                        disabled
                                        v-model="editedItem.neighborhood"
                                        label="Bairro"

                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field outlined
                                        v-model="editedItem.complement"
                                        label="Complemento"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                        color="success"
                        @click="save"
                    >
                      Salvar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Deseja realmente apagar esse vendedor?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item.id)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn
                color="primary"
                @click="initialize"
            >
              Recarregar
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SellerService from "@/services/seller";
import axios from "axios";

export default {
  data: () => ({
    show1: false,
    rules: {
      required: value => !!value || 'Obrigatório.',
      min: v => v.length >= 8 || 'Min 8 letras',
    },
    idToDelete: -1,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'id',
        value: 'id',
        align: 'start'
      },
      {
        text: 'Nome',
        value: 'name',
      },
      {text: 'CPF/CNPJ', value: 'cpf_cnpj'},
      {text: 'Email', value: 'email'},
      {text: 'Telefone', value: 'phone'},
      {text: 'Ação', value: 'actions', sortable: false},
    ],
    sellers: [],
    editedIndex: -1,
    editedItem: {
      id: -1,
      name: '',
      cpf_cnpj: '',
      email: '',
      phone: '',
      zipcode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      password: ''
    },
    defaultItem: {
      id: -1,
      name: '',
      cpf_cnpj: '',
      email: '',
      phone: '',
      zipcode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      password: ''
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo vendedor' : 'Editar vendedor'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  async beforeMount() {
    await this.findAll()
  },

  methods: {
    searchCep() {
      if (this.editedItem.zipcode.length == 9) {
        axios.get(`https://viacep.com.br/ws/${this.editedItem.zipcode}/json/`)
            .then(response => {
              this.editedItem.street = response.data.logradouro;
              this.editedItem.neighborhood = response.data.bairro;
            })
            .catch(error => console.log(error))
      }
    },
    async findAll() {
      const res = await SellerService.findAll()
      this.sellers = res
    },

    editItem(item) {
      this.editedIndex = this.sellers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(id) {
      this.idToDelete = id
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      SellerService.remove(this.idToDelete)
          .then(res => {
            this.findAll()
          })
          .catch(err => console.log(err))
          .finally(() => {
            this.idToDelete = -1;
            this.dialogDelete = false
          })
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      if (this.editedIndex > -1) {
        await SellerService.edit(this.editedItem.id, this.editedItem)
      } else {
        delete this.editedItem.id
        await SellerService.create(this.editedItem)
      }
      await this.findAll()
      this.close()
    },
  },
}
</script>
