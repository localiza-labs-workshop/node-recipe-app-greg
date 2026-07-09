---
name: mickey-commit
description: >-
  Padroniza mensagens de commit com título e descrição no estilo Mickey Mouse.
  Use quando for realizar um git commit, criar mensagem de commit, padronizar commits
  ou mencionar Mickey Mouse nos commits deste repositório.
disable-model-invocation: true
---

# Mickey Commit

Padroniza commits deste repositório com **título + descrição**, sempre na voz do Mickey Mouse.

## Formato obrigatório

```
<título no estilo Mickey>

<descrição no estilo Mickey — 2 a 5 frases explicando o que mudou e por quê>
```

- **Título**: uma linha curta (até ~72 caracteres), entusiasmada, resumindo a mudança.
- **Descrição**: parágrafo separado por linha em branco; detalha o que foi feito de forma clara, ainda na voz do Mickey.
- **Sem** prefixos Conventional Commits (`feat:`, `fix:`) — só a voz do Mickey.

## Voz do Mickey

Mantenha o tom alegre, otimista e simples:

- Use expressões como: *Oh boy!*, *Ha-ha!*, *Gosh!*, *Hot dog!*, *Gee whiz!*
- Trate o leitor como *pal*, *folks* ou *pals*
- Mickey fala na primeira pessoa (*Mickey fez...*, *I fixed...* — português ou inglês, conforme o resto do projeto)
- Seja entusiasmado, mas **não** esconda o conteúdo técnico — diga *o quê* mudou e *por quê*
- Evite sarcasmo, ironia ou tom formal/corporativo

## Fluxo

1. **Analisar mudanças** (em paralelo quando possível):
   ```bash
   git status
   git diff
   git diff --cached
   git log -5 --oneline
   ```
2. **Entender** tipo de mudança, arquivos afetados e motivo.
3. **Redigir** título + descrição no estilo Mickey.
4. **Validar**:
   - [ ] Tem título e descrição (linha em branco entre eles)
   - [ ] Título resume a mudança
   - [ ] Descrição explica o que e por quê
   - [ ] Tom consistente com Mickey
   - [ ] Não inclui segredos (`.env`, tokens, senhas)
5. **Commitar** (só se o usuário pediu explicitamente):
   ```bash
   git add <arquivos relevantes>
   git commit -m "$(cat <<'EOF'
   <título no estilo Mickey>

   <descrição no estilo Mickey>
   EOF
   )"
   git status
   ```

## Exemplos

### Nova feature

```
Oh boy, a shiny new Hello World screen!

Ha-ha! Mickey built a real nice hello page for all the pals to see. Gosh, it
uses React and Tailwind just like the plan said. Hot dog, it looks swell!
```

### Bug fix

```
Gosh, fixing that double-click bug on login!

Ha-ha! The pals were clicking the button too fast and things got messy. Mickey
made the button take a little nap while the request runs. Oh boy, much safer now!
```

### Refactor / chore

```
Hot dog, cleaning up the project setup!

Gee whiz, Mickey tidied the config files so everything starts up smooth for the
folks. No new features — just making the clubhouse neat and tidy. Ha-ha!
```

## Quando o usuário não pediu commit

Mostre a mensagem sugerida e pergunte se pode commitar. **Nunca** commite sem pedido explícito.

## Apresentação ao usuário

```markdown
## Mensagem de commit (Mickey)

<título>

<descrição>

**Arquivos:** X modificados, Y criados
**Resumo:** [uma linha técnica, fora da voz Mickey, se ajudar na revisão]
```
