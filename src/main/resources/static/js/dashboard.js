function carregarCarros() {
    fetch('/api/carros')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return response.json();
        })
        .then(carros => {
            const tbody = document.getElementById('listaCarros');

            if (!carros || carros.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="8" class="text-center">
                            Nenhum veículo cadastrado.
                        </td>
                    </tr>
                `;
                return;
            }

            let html = '';

            carros.forEach(carro => {
                const statusClass = pegarClasseStatus(carro.status);

                const nomeCliente = carro.usuario?.name || '—';
                const telefone = carro.usuario?.number_phone || carro.usuario?.numberPhone || '—';

                html += `
                    <tr>
                        <td>${carro.id}</td>
                        <td>${carro.model}</td>
                        <td>${carro.brand}</td>
                        <td>${carro.year}</td>
                        <td>${carro.problem || '—'}</td>
                        <td>
                            <span class="badge ${statusClass}">
                                ${formatarStatus(carro.status)}
                            </span>
                        </td>
                        <td>
                            <strong>${nomeCliente}</strong><br>
                            <small class="text-muted">📞 ${telefone}</small>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-outline-secondary" onclick="editarCarro(${carro.id})">
                                ✏️
                            </button>

                            <button class="btn btn-sm btn-outline-danger" onclick="excluirCarro(${carro.id})">
                                🗑️
                            </button>
                        </td>
                    </tr>
                `;
            });

            tbody.innerHTML = html;
        })
        .catch(err => {
            console.error('Erro ao carregar carros:', err);

            document.getElementById('listaCarros').innerHTML = `
                <tr>
                    <td colspan="8" class="text-danger text-center">
                        Erro ao carregar dados.
                    </td>
                </tr>
            `;
        });
}

function carregarClientesNoSelect(usuarioAtualId) {
    const select = document.getElementById('editUsuarioId');

    select.innerHTML = '<option value="">Carregando clientes...</option>';

    fetch('/api/usuario')
        .then(res => {
            if (!res.ok) {
                throw new Error('Erro ao carregar clientes.');
            }

            return res.json();
        })
        .then(usuarios => {
            if (!usuarios || usuarios.length === 0) {
                select.innerHTML = '<option value="">Nenhum cliente cadastrado</option>';
                return;
            }

            let html = '<option value="">Selecione um cliente</option>';

            usuarios.forEach(usuario => {
                const telefone = usuario.number_phone || usuario.numberPhone || 'Sem telefone';

                html += `
                    <option value="${usuario.id}">
                        ${usuario.name} - ${telefone}
                    </option>
                `;
            });

            select.innerHTML = html;

            if (usuarioAtualId) {
                select.value = usuarioAtualId;
            }
        })
        .catch(err => {
            console.error('Erro ao carregar clientes:', err);

            select.innerHTML = '<option value="">Erro ao carregar clientes</option>';
        });
}

function pegarClasseStatus(status) {
    if (status === 'PENDENTE') {
        return 'bg-warning';
    }

    if (status === 'EM_ANDAMENTO') {
        return 'bg-info';
    }

    if (status === 'CONCLUIDO') {
        return 'bg-success';
    }

    return 'bg-secondary';
}

function formatarStatus(status) {
    if (status === 'PENDENTE') {
        return 'Pendente';
    }

    if (status === 'EM_ANDAMENTO') {
        return 'Em andamento';
    }

    if (status === 'CONCLUIDO') {
        return 'Concluído';
    }

    return status || '—';
}

function editarCarro(id) {
    fetch(`/api/carros/${id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Erro ao buscar carro.');
            }

            return res.json();
        })
        .then(carro => {
            document.getElementById('editCarroId').value = carro.id;
            document.getElementById('editModeloCarro').value = carro.model || '';
            document.getElementById('editMarcaCarro').value = carro.brand || '';
            document.getElementById('editAnoCarro').value = carro.year || '';
            document.getElementById('editProblemaCarro').value = carro.problem || '';
            document.getElementById('editStatusCarro').value = carro.status || 'PENDENTE';

            carregarClientesNoSelect(carro.usuario?.id);

            document.getElementById('msgEditarCarro').innerHTML = '';

            const modalElement = document.getElementById('modalEditarCarro');
            const modal = new bootstrap.Modal(modalElement);

            modal.show();
        })
        .catch(err => {
            alert(err.message);
        });
}

function excluirCarro(id) {
    const confirmou = confirm('Tem certeza que deseja excluir este carro?');

    if (!confirmou) {
        return;
    }

    fetch(`/api/carros/${id}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (res.ok) {
                carregarCarros();
                return;
            }

            alert('Erro ao excluir: ' + res.status);
        })
        .catch(err => {
            alert('Erro: ' + err.message);
        });
}

function atualizarDataHora() {
    const agora = new Date();
    const div = document.getElementById('dataHora');

    if (div) {
        div.innerHTML = `<i class="material-icons fs-6">schedule</i> ${agora.toLocaleString('pt-BR')}`;
    }
}

document.getElementById('formEditarCarro').addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('editCarroId').value;
    const usuarioId = document.getElementById('editUsuarioId').value;

    if (!usuarioId) {
        document.getElementById('msgEditarCarro').innerHTML = `
            <div class="alert alert-warning">
                Selecione um cliente.
            </div>
        `;
        return;
    }

    const carroAtualizado = {
        model: document.getElementById('editModeloCarro').value,
        brand: document.getElementById('editMarcaCarro').value,
        year: parseInt(document.getElementById('editAnoCarro').value),
        problem: document.getElementById('editProblemaCarro').value,
        status: document.getElementById('editStatusCarro').value,
        usuario: {
            id: parseInt(usuarioId)
        }
    };

    fetch(`/api/carros/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carroAtualizado)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Erro ao atualizar carro.');
            }

            return res.json();
        })
        .then(() => {
            document.getElementById('msgEditarCarro').innerHTML = `
                <div class="alert alert-success">
                    Carro atualizado com sucesso!
                </div>
            `;

            carregarCarros();

            setTimeout(() => {
                const modalElement = document.getElementById('modalEditarCarro');
                const modal = bootstrap.Modal.getInstance(modalElement);

                if (modal) {
                    modal.hide();
                }

                document.getElementById('msgEditarCarro').innerHTML = '';
            }, 1000);
        })
        .catch(err => {
            document.getElementById('msgEditarCarro').innerHTML = `
                <div class="alert alert-danger">
                    ${err.message}
                </div>
            `;
        });
});

carregarCarros();
atualizarDataHora();
setInterval(atualizarDataHora, 1000);