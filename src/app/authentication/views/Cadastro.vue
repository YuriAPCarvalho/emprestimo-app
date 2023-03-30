<template>
    <v-row justify="center" align="center" class="bg">
        <v-col cols="7">
            <v-card class="mx-auto">

                <div class="text-center mt-10">
                    <h3>FAÇA SEU CADASTRO</h3>
                </div>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field class="txt" outlined v-model="name" :rules="nameRules" label="Nome"
                            required></v-text-field>
                        <v-text-field class="txt" outlined v-model="cpf_cnpj" :rules="nameRules" label="CPF"
                            required></v-text-field>
                        <v-text-field class="txt" outlined v-model="email" :rules="nameRules" label="E-mail"
                            required></v-text-field>
                        <v-text-field class="txt" outlined v-model="phone" :rules="nameRules" label="Telefone"
                            required></v-text-field>
                        <v-text-field class="txt" outlined v-model="zipcode" :rules="nameRules" label="CEP"
                            required></v-text-field>
                        <v-text-field class="txt" outlined v-model="street" :rules="nameRules" label="Endereço"
                            required></v-text-field>
                        <v-text-field class="txt" outlined v-model="number" :rules="nameRules" label="Número"
                            required></v-text-field>
                        <v-text-field class="txt" outlined v-model="complement" :rules="nameRules" label="Complemento"
                            required></v-text-field>

                        <div class="text-center">
                            <v-btn :disabled="!valid" class="ma-1 " color="primary" @click="login">
                                <v-icon left>
                                    mdi-checkbox-marked-circle
                                </v-icon>Login
                            </v-btn>

                            <v-btn :disabled="!valid" color="success" class="ma-1" @click="cadastro" to="/cadastro">
                                <v-icon left>
                                    mdi-pencil
                                </v-icon>Cadastre-se
                            </v-btn>

                            <v-btn :disabled="!valid" color="red darken-1" class="ma-1" @click="oauth">
                                <v-icon left>
                                    mdi-email
                                </v-icon> Entrar com Google
                            </v-btn>

                        </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data: () => ({
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'E-mail is required'
        ]
    }),

    methods: {
        validate() {
            this.$refs.form.validate()
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
    },
}
</script>

<style scoped>
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url('../../../assets/home_background.png') no-repeat center center;
    background-size: cover;
    transform: scale(1.1);
}

.custom-img {
    border-radius: 10px;
}

.txt {
    margin-bottom: -20px;
}
</style>
