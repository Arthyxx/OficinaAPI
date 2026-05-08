function carregarClientes() {
    fetch('/api/usuario')
        .then(res => {
            if (!res.ok) {
                throw new Error('Erro ao carregar clientes.');
            }

            return res.json();
        })
        .then(usuarios => {
            preencherTabelaClientes(usuarios);
            preencherSelectClientes(usuarios);
        })
        .catch(err => {
            console.error('Erro ao carregar clientes:', err);

            document.getElementById('listaClientes').innerHTML = `
                <tr>
                    <td colspan="3" class="text-danger">
                        Erro ao carregar clientes.
                    </td>
                </tr>
            `;

            document.getElementById('usuarioId').innerHTML = `
                <option value="">
                    Erro ao carregar clientes
                </option>
            `;
        });
}

function preencherTabelaClientes(usuarios) {
    const tbody = document.getElementById('listaClientes');

    if (!usuarios || usuarios.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3">
                    Nenhum cliente cadastrado.
                </td>
            </tr>
        `;
        return;
    }

    let html = '';

    usuarios.forEach(usuario => {
        const telefone = usuario.number_phone || usuario.numberPhone || '—';

        html += `
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.name}</td>
                <td>${telefone}</td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

function preencherSelectClientes(usuarios) {
    const select = document.getElementById('usuarioId');

    if (!usuarios || usuarios.length === 0) {
        select.innerHTML = `
            <option value="">
                Nenhum cliente cadastrado
            </option>
        `;
        return;
    }

    let html = `
        <option value="">
            Selecione um cliente
        </option>
    `;

    usuarios.forEach(usuario => {
        const telefone = usuario.number_phone || usuario.numberPhone || 'Sem telefone';

        html += `
            <option value="${usuario.id}">
                ${usuario.name} - ${telefone}
            </option>
        `;
    });

    select.innerHTML = html;
}

document.getElementById('formCliente').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nomeCliente').value.trim();
    const telefone = document.getElementById('telefoneCliente').value.trim();
    const senha = document.getElementById('senhaCliente').value;
    const tipo = document.getElementById('tipoCliente').value;

    if (!nome) {
        mostrarMensagemCliente('Informe o nome do cliente.', 'warning');
        return;
    }

    if (!telefone) {
        mostrarMensagemCliente('Informe o telefone do cliente.', 'warning');
        return;
    }

    const telefoneLimpo = telefone.replace(/\D/g, '');

    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
        mostrarMensagemCliente('Telefone inválido. Use DDD + número.', 'warning');
        return;
    }

    const novoUsuario = {
        name: nome,
        number_phone: telefoneLimpo,
        password: senha,
        type: tipo
    };

    fetch('/api/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)
    })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => {
                    throw new Error(text || 'Erro ao cadastrar cliente.');
                });
            }

            return res.json();
        })
        .then(data => {
            mostrarMensagemCliente(`Cliente cadastrado com sucesso! ID: ${data.id}`, 'success');

            document.getElementById('formCliente').reset();
            document.getElementById('tipoCliente').value = 'CLIENTE';

            carregarClientes();
        })
        .catch(err => {
            console.error('Erro ao cadastrar cliente:', err);
            mostrarMensagemCliente(`Erro ao cadastrar cliente: ${err.message}`, 'danger');
        });
});

document.getElementById('formCarro').addEventListener('submit', function(e) {
    e.preventDefault();

    const usuarioId = document.getElementById('usuarioId').value;

    if (!usuarioId) {
        mostrarMensagemCarro('Selecione um cliente.', 'warning');
        return;
    }

    const novoCarro = {
        model: document.getElementById('modeloCarro').value.trim(),
        brand: document.getElementById('marcaCarro').value.trim(),
        year: parseInt(document.getElementById('anoCarro').value),
        problem: document.getElementById('problemaCarro').value.trim(),
        status: 'PENDENTE'
    };

    if (!novoCarro.model || !novoCarro.brand || !novoCarro.year || !novoCarro.problem) {
        mostrarMensagemCarro('Preencha todos os dados do carro.', 'warning');
        return;
    }

    fetch(`/api/carros/usuario/${usuarioId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoCarro)
    })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => {
                    throw new Error(text || 'Erro ao cadastrar carro.');
                });
            }

            return res.json();
        })
        .then(data => {
            mostrarMensagemCarro(`Carro cadastrado com sucesso! ID: ${data.id}`, 'success');

            document.getElementById('formCarro').reset();
        })
        .catch(err => {
            console.error('Erro ao cadastrar carro:', err);
            mostrarMensagemCarro(`Erro ao cadastrar carro: ${err.message}`, 'danger');
        });
});

function mostrarMensagemCliente(mensagem, tipo) {
    const div = document.getElementById('msgCliente');

    div.innerHTML = `
        <div class="alert alert-${tipo}">
            ${mensagem}
        </div>
    `;

    setTimeout(() => {
        div.innerHTML = '';
    }, 3000);
}

function mostrarMensagemCarro(mensagem, tipo) {
    const div = document.getElementById('msgCarro');

    div.innerHTML = `
        <div class="alert alert-${tipo}">
            ${mensagem}
        </div>
    `;

    setTimeout(() => {
        div.innerHTML = '';
    }, 3000);
}

function atualizarDataHora() {
    const agora = new Date();
    const div = document.getElementById('dataHora');

    if (div) {
        div.innerHTML = `<i class="material-icons fs-6">schedule</i> ${agora.toLocaleString('pt-BR')}`;
    }
}

carregarClientes();
atualizarDataHora();
setInterval(atualizarDataHora, 1000);