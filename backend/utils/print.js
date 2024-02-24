
const moment = require('moment');

class Print {
    constructor({ informa, alerta, erro, sucesso } = {}) {
        this.dataFormatada = () => moment().format('DD/MM/YYYY HH:mm:ss');
        this._sucesso = sucesso || '';
        this._informa = informa || '';
        this._alerta = alerta || '';
        this._erro = erro || '';

        this.verde = function (text) {
            return `\x1b[32m${text}\x1b[0m`; // Código ANSI para verde
        };

        this.vermelho = function (text) {
            return `\x1b[31m${text}\x1b[0m`; // Código ANSI para vermelho
        };

        this.amarelo = function (text) {
            return `\x1b[33m${text}\x1b[0m`; // Código ANSI para laranja (amarelo)
        };

        this.roxo = function (text) {
            return `\x1b[34m${text}\x1b[0m`; // Código ANSI para azul (roxo)
        };

        this.cinza = function (text) {
            return `\x1b[90m${text}\x1b[0m`; // Código ANSI para cinza
        };
    }

    default = function (...args) {
        console.log(this.cinza(this.dataFormatada()), ' ' + args.join(''));
        return this;
    };

    informa = function (...args) {
        console.log(this.cinza(this.dataFormatada()), this.roxo(` ${this._informa} `) + args.join(''));
        return this;
    };

    sucesso = function (...args) {
        console.log(this.cinza(this.dataFormatada()), this.verde(` ${this._sucesso} `) + args.join(''));
        return this;
    };

    alerta = function (...args) {
        console.log(this.cinza(this.dataFormatada()), this.amarelo(` ${this._alerta} `) + args.join(''));
        return this;
    };

    erro = function (...args) {
        console.error(this.cinza(this.dataFormatada()), this.vermelho(` ${this._erro} `) + args.join(''));
        return this;
    };

    static TrocarPrefixo({ informa, alerta, erro, sucesso }, print) {
        let err = false;
        let warnning = false;
        try {
            if (!print) warnning = 'Um segundo parâmetro se torna necessário ao utilizar um método stático.';
            if (!informa && !alerta && !erro && !sucesso) warnning = 'Primeiro parâmetro vazio ou sem atributos váidos. Nada foi alterado.';

            if (sucesso) print._sucesso = sucesso;
            if (informa) print._informa = informa;
            if (alerta) print._alerta = alerta;
            if (erro) print._erro = erro;

        } catch (error) { err = `Quebra de código: ${error}`; }

        if (err) new Print({ alerta: 'Print - TrocarPrefixo:' }).erro(err);
        if (warnning) new Print({ alerta: 'Print - TrocarPrefixo:' }).alerta(warnning);
    }

    TrocarPrefixo({ informa, alerta, erro, sucesso }, print) {
        let err = false;
        let warnning = false;

        if (!print) print = this;
        if (!informa && !alerta && !erro && !sucesso) warnning = 'Primeiro parâmetro vazio ou sem atributos váidos. Nada foi alterado.';

        if (sucesso) print._sucesso = sucesso;
        if (informa) print._informa = informa;
        if (alerta) print._alerta = alerta;
        if (erro) print._erro = erro;

        if (err) new Print({ alerta: 'Print - TrocarPrefixo:' }).erro(err);
        if (warnning) new Print({ alerta: 'Print - TrocarPrefixo:' }).alerta(warnning);
    }
}



module.exports.Print = Print;