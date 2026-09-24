# Menus da rede EXE

Definições dos menus da rede EXE para Minecraft 1.8.8.

- `global/`: os menus de todos os servidores.
- `<serverId>/` (hoje `p4free/`): os menus que só existem nesse servidor, ou que trocam um do
  `global/` de mesmo nome.

O nome de um menu é o caminho dentro da pasta de topo, sem o `.json`:
`global/core/spigot/views/confirmation.json` é o menu `core/spigot/views/confirmation`. É esse nome que
o código passa ao `View`.

Texto visível não vai aqui: o título e os itens apontam para chaves do `exe-minecraft/locale`.

## Como mudar um menu

Edite o `.json` e faça push no `main`. Não há build nem `dist/`: em até 3 minutos a plataforma baixa
as fontes, monta os menus e avisa os servidores pelo Echo, sem reiniciar nada.

Os arquivos são JSON estrito, sem comentário nem vírgula sobrando. Se um deles não for um objeto JSON
válido, a plataforma recusa a versão inteira, o jogo continua com a anterior e o motivo aparece no
painel como "Conteúdo recusado: menu". Quem monta é o `MenuBundles`, no core do monorepo.
