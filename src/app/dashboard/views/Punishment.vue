<template>
  <v-container fill-height fluid>
    <v-row justify="center">
      <v-col cols="10">
        <v-data-table :headers="headers" :items="punishment" sort-by="name" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="900px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                    Nova punição
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field outlined v-model="editedItem.name" label="Descrição" />
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-combobox v-model="editedItem.type_punishment" :items="type" item-value="value"
                            item-text="text" label="Combobox" outlined></v-combobox>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field outlined v-model="editedItem.value" label="Valor" />
                        </v-col>

                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="success" @click="save">
                      Salvar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Deseja realmente apagar essa punição?</v-card-title>
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
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item.id)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
              Recarregar
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PunishmentService from "@/services/punishment";
import axios from "axios";

export default {
  data: () => ({
    type: [
      {
        text: "Valor Fixo",
        value: "fixed_value"
      },
      {
        text: "Valor Percentual",
        value: "percent_value"
      }
    ],
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
      { text: 'Descrição', value: 'name', },
      { text: 'Tipo', value: 'type_punishment' },
      { text: 'Valor', value: 'value' },
      { text: 'Ação', value: 'actions', sortable: false },
    ],
    punishment: [],
    editedIndex: -1,
    editedItem: {
      id: -1,
      name: '',
      type_punishment: '',
      value: '',
    },
    defaultItem: {
      id: -1,
      name: '',
      type_punishment: '',
      value: '',

    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nova punição' : 'Editar vendedor'
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
      const res = await PunishmentService.findAll()
      this.punishment = res
    },

    editItem(item) {
      this.editedIndex = this.punishment.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(id) {
      this.idToDelete = id
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      PunishmentService.remove(this.idToDelete)
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
      const payload = { ...this.editedItem, type_punishment: this.editedItem.type_punishment.value }

      if (this.editedIndex > -1) {
        await PunishmentService.edit(this.editedItem.id, payload)
      } else {
        delete this.editedItem.id
        await PunishmentService.create(payload)
      }
      await this.findAll()
      this.close()
    },
  },
}
</script>
