// app/(auth)/autonomo/cadastro.tsx
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "../../../lib/api";

const C = {
  bg: "#2E3137",
  card: "#3B3F45",
  yellow: "#F1B82D",
  text: "#EAECEF",
  sub: "#9AA3AD",
  border: "#4A4F56",
  black: "#0B0B0B",
};

type Step =
  | "nome"
  | "contato"
  | "senha"
  | "endereco"
  | "cpf"
  | "doc_rgcpf"
  | "doc_resid"
  | "doc_selfie"
  | "cnpj"
  | "areas"
  | "finalizado";

export default function CadastroAutonomo() {
  const [step, setStep] = useState<Step>("nome");

  // dados
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [usarTelefone, setUsarTelefone] = useState(false);
  const [telefone, setTelefone] = useState("");

  const [senha, setSenha] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");

  const [areas, setAreas] = useState<string[]>([]);
  const toggleArea = (a: string) =>
    setAreas((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));

  // validação simples por passo
  const canNext = (() => {
    switch (step) {
      case "nome":
        return nome.trim().length >= 2;
      case "contato":
        return usarTelefone ? telefone.trim().length >= 8 : /\S+@\S+\.\S+/.test(email);
      case "senha":
        return senha.length >= 6;
      case "endereco":
        return estado.trim() && cidade.trim();
      case "cpf":
        return cpf.replace(/\D/g, "").length === 11;
      case "doc_rgcpf":
      case "doc_resid":
      case "doc_selfie":
        return true; // depois plugamos o picker; por ora libera
      case "cnpj":
        return true; // opcional
      case "areas":
        return areas.length > 0;
      case "finalizado":
        return true;
      default:
        return false;
    }
  })();

  function maskCPF(v: string) {
    return v
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function maskPhone(v: string) {
    return v
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
  }

  async function submit() {
    try {
      const payload = {
        role: "AUTONOMO",
        name: nome,
        email: usarTelefone ? undefined : email,
        phone: usarTelefone ? telefone : undefined,
        password: senha,
        estado,
        cidade,
        cpf,
        cnpj: cnpj || undefined,
        areas,
        sexo: "NA", // tela de sexo pode preencher isto, se você quiser encadear
      };

      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());
      setStep("finalizado");
    } catch (e: any) {
      Alert.alert("Erro", e.message || "Não foi possível concluir o cadastro");
    }
  }

  function next() {
    if (!canNext) return;
    const order: Step[] = [
      "nome",
      "contato",
      "senha",
      "endereco",
      "cpf",
      "doc_rgcpf",
      "doc_resid",
      "doc_selfie",
      "cnpj",
      "areas",
      "finalizado",
    ];
    const i = order.indexOf(step);
    if (i === order.length - 2) {
      // indo para submit antes do "finalizado"
      submit();
    } else {
      setStep(order[i + 1]);
    }
  }

  function back() {
    const order: Step[] = [
      "nome",
      "contato",
      "senha",
      "endereco",
      "cpf",
      "doc_rgcpf",
      "doc_resid",
      "doc_selfie",
      "cnpj",
      "areas",
      "finalizado",
    ];
    const i = order.indexOf(step);
    if (i > 0) setStep(order[i - 1]);
    else router.back();
  }

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      {/* header */}
      <View style={{ paddingHorizontal: 22, paddingTop: 22 }}>
        <TouchableOpacity onPress={back} style={{ width: 36, height: 36, alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
          <Ionicons name="chevron-back" size={24} color={C.text} />
        </TouchableOpacity>
      </View>

      {/* conteúdo */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 20 }}>
        {step === "nome" && (
          <View>
            <Title primary="Bem-vindo à Beecoz!" secondary="Para começar, qual seu nome?" />
            <Input value={nome} onChangeText={setNome} placeholder="Seu nome" autoCapitalize="words" />
          </View>
        )}

        {step === "contato" && (
          <View>
            <Title
              primary={`Muito bem, ${nome || "profissional"}!`}
              secondary="Agora, informe seu melhor email, ou se preferir, seu número de telefone-celular:"
            />
            {!usarTelefone ? (
              <>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="seuemail@dominio.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <SmallToggle label="registrar com meu número" value={usarTelefone} onToggle={() => setUsarTelefone(true)} />
              </>
            ) : (
              <>
                <Input value={telefone} onChangeText={(t) => setTelefone(maskPhone(t))} placeholder="(00) 00000-0000" keyboardType="phone-pad" />
                <SmallToggle label="registrar com meu número" value={usarTelefone} onToggle={() => setUsarTelefone(false)} checkedStyle />
              </>
            )}
          </View>
        )}

        {step === "senha" && (
          <View>
            <Title primary="Ok, quase lá!" secondary="Agora, crie uma senha:" />
            <Input value={senha} onChangeText={setSenha} placeholder="********" secureTextEntry />
            <Hint text="Pelo menos 6 caracteres. Guarde sua senha, não a compartilhe." />
          </View>
        )}

        {step === "endereco" && (
          <View>
            <Title primary="Agora, informe onde você mora, por gentileza!" />
            <Label text="Seu estado" />
            <Input value={estado} onChangeText={setEstado} placeholder="Estado" />
            <Label text="Sua Cidade ou Município" />
            <Input value={cidade} onChangeText={setCidade} placeholder="Cidade ou Município" />
          </View>
        )}

        {step === "cpf" && (
          <View>
            <Title primary="Falta pouco!" secondary="Informe seu CPF:" />
            <Input value={cpf} onChangeText={(t) => setCpf(maskCPF(t))} placeholder="000.000.000-00" keyboardType="numeric" />
          </View>
        )}

        {step === "doc_rgcpf" && (
          <DocCard
            title="Insira uma foto do seu RG ou CPF, frente e verso, nítida:"
            onAdd={() => Alert.alert("Foto", "Depois conectamos ao ImagePicker.")}
          />
        )}

        {step === "doc_resid" && (
          <DocCard
            title="Insira uma foto do comprovante de residência, dos últimos 03 meses, nítida:"
            onAdd={() => Alert.alert("Foto", "Depois conectamos ao ImagePicker.")}
          />
        )}

        {step === "doc_selfie" && (
          <DocCard title="Insira uma foto sua, atual, nítida:" onAdd={() => Alert.alert("Foto", "Depois conectamos ao ImagePicker.")} />
        )}

        {step === "cnpj" && (
          <View>
            <Title primary="Cadastro CNPJ (opcional)" secondary="Se for do seu interesse, informe o CNPJ de sua empresa:" />
            <Input value={cnpj} onChangeText={setCnpj} placeholder="00.000.000/0001-00" keyboardType="numeric" />
            <Hint text="Você pode deixar em branco e preencher depois." />
          </View>
        )}

        {step === "areas" && (
          <View>
            <Title primary="Qual é a sua área de atuação?" />
            {["Manicure", "Pedicure", "Cabelo", "Maquiagem", "Estética", "Massagem"].map((a) => (
              <CheckRow key={a} label={a} checked={areas.includes(a)} onToggle={() => toggleArea(a)} />
            ))}
          </View>
        )}

        {step === "finalizado" && (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text style={{ fontSize: 56, marginBottom: 16 }}>🐝</Text>
            <Text style={{ color: C.text, fontSize: 16, textAlign: "center" }}>
              Os dados apresentados estão em análise.{"\n"}Quando analisarmos, enviaremos uma mensagem ao e-mail informado no cadastro.
            </Text>
            <TouchableOpacity
              onPress={() => router.replace("/(autonomo)")}
              style={{ backgroundColor: C.yellow, height: 50, borderRadius: 12, alignItems: "center", justifyContent: "center", marginTop: 24, paddingHorizontal: 24 }}
            >
              <Text style={{ color: "#1B1B1B", fontWeight: "700" }}>Início</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* footer (barra preta + Continuar) */}
      {!["finalizado"].includes(step) && (
        <View style={{ backgroundColor: C.black, paddingHorizontal: 22, paddingVertical: 12, borderTopLeftRadius: 14, borderTopRightRadius: 14 }}>
          <TouchableOpacity
            onPress={next}
            disabled={!canNext}
            style={{ height: 50, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: canNext ? C.yellow : C.card }}
          >
            <Text style={{ color: canNext ? "#0B0B0B" : "#9AA3AD", fontWeight: "700" }}>{step === "areas" ? "Concluir" : "Continuar"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

/** --------------- pequenos componentes locais para manter tudo num arquivo --------------- */
function Title({ primary, secondary }: { primary: string; secondary?: string }) {
  return (
    <View style={{ marginTop: 8, marginBottom: 14 }}>
      <Text style={{ color: C.text, fontSize: 18, fontWeight: "700", marginBottom: secondary ? 4 : 0 }}>{primary}</Text>
      {secondary ? <Text style={{ color: C.sub, fontSize: 14 }}>{secondary}</Text> : null}
    </View>
  );
}

function Input(props: any) {
  return (
    <View style={{ backgroundColor: C.card, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 12 }}>
      <TextInput placeholderTextColor={C.sub} style={{ color: C.text, fontSize: 16 }} {...props} />
    </View>
  );
}

function Label({ text }: { text: string }) {
  return <Text style={{ color: C.sub, marginBottom: 6 }}>{text}</Text>;
}

function Hint({ text }: { text: string }) {
  return <Text style={{ color: C.sub, fontSize: 12, marginTop: -4, marginBottom: 12 }}>{text}</Text>;
}

function SmallToggle({ label, value, onToggle, checkedStyle }: { label: string; value: boolean; onToggle: () => void; checkedStyle?: boolean }) {
  return (
    <TouchableOpacity onPress={onToggle} style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12 }}>
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: 6,
          borderWidth: 1.5,
          borderColor: value ? C.yellow : C.sub,
          backgroundColor: value ? C.yellow : "transparent",
        }}
      />
      <Text style={{ color: checkedStyle ? C.text : C.sub }}>{label}</Text>
    </TouchableOpacity>
  );
}

function CheckRow({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  return (
    <TouchableOpacity onPress={onToggle} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: C.card, borderRadius: 12, padding: 12, marginBottom: 10 }}>
      <Text style={{ color: C.text }}>{label}</Text>
      <Ionicons name={checked ? "checkbox" : "square-outline"} size={22} color={checked ? C.yellow : C.sub} />
    </TouchableOpacity>
  );
}

function DocCard({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <View style={{ marginTop: 8 }}>
      <Text style={{ color: C.text, fontWeight: "700", marginBottom: 10 }}>{title}</Text>
      <TouchableOpacity onPress={onAdd} style={{ height: 160, borderRadius: 12, backgroundColor: C.card, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: C.border }}>
        <Ionicons name="person-circle-outline" size={54} color={C.sub} />
        <Text style={{ color: C.sub, marginTop: 6 }}>Adicione uma foto</Text>
      </TouchableOpacity>
    </View>
  );
}
