import { SafeAreaView, ScrollView, View, Text, Image } from 'react-native';
import { SkillCard } from './components/SkillCard';
import { ProjectCard } from './components/ProjectCard';

// ==================== INTERFACES ====================
interface ContactInfo {
  icon: string;
  label: string;
  value: string;
}

interface Skill {
  id: string;
  emoji: string;
  name: string;
}

interface Project {
  id: string;
  emoji: string;
  title: string;
  description: string;
  tags: string[];
}

// ==================== DATOS PERSONALES ====================
const personalInfo = {
  name: 'Johan Alejandro Quintero Barros',
  title: 'Tecnólogo en ADSO',
  avatar: 'data:image/jpeg;base64,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',
  bio: 'Tecnólogo en Análisis y Desarrollo de Software con pasión por crear soluciones móviles innovadoras. Me especializo en React Native y busco constantemente mejorar mis habilidades en desarrollo frontend y backend. Mi objetivo es construir aplicaciones que impacten positivamente la vida de los usuarios.',
};

const contacts: ContactInfo[] = [
  { icon: '📧', label: 'Email', value: 'johanqui302006@gmail.com' },
  { icon: '📍', label: 'Ubicación', value: 'Bogotá D.C., Colombia' },
  { icon: '🔗', label: 'GitHub', value: 'https://github.com/' },
];

const skills: Skill[] = [
  { id: '1', emoji: '⚛️', name: '1. React Native' },
  { id: '2', emoji: '📘', name: '2. TypeScript' },
  { id: '3', emoji: '🎨', name: '3. TailwindCSS' },
  { id: '4', emoji: '🔥', name: '4. Python' },
  { id: '5', emoji: '🎯', name: '5. Git y GitHub' },
];

const projects: Project[] = [
  {
    id: '1',
    emoji: '🎬',
    title: 'App de Películas',
    description:
      'Aplicación para explorar películas populares con integración a API de TMDB. Incluye búsqueda, filtros y detalles completos de cada película.',
    tags: ['React Native', 'API Rest', 'TypeScript'],
  },
  {
    id: '2',
    emoji: '🛒',
    title: 'E-Commerce Mobile',
    description:
      'Tienda en línea con carrito de compras, pasarela de pagos y gestión de inventario en tiempo real.',
    tags: ['React Native', 'Firebase', 'Stripe'],
  },
  {
    id: '3',
    emoji: '💬',
    title: 'Chat en Tiempo Real',
    description:
      'Sistema de mensajería instantánea con notificaciones push, estados de lectura y compartir multimedia.',
    tags: ['React Native', 'Socket.io', 'Node.js'],
  },
];

// ==================== COMPONENTE PRINCIPAL ====================
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#c9c9c9' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* ==================== HEADER ==================== */}
        <View style={{ 
          backgroundColor: '#2563eb', 
          height: 192, 
          alignItems: 'center', 
          justifyContent: 'center', 
          paddingBottom: 0
        }}>
          <Text style={{ 
            color: 'white', 
            fontSize: 28, 
            fontWeight: 'bold',
            letterSpacing: 1
          }}>
            MI APP PERSONAL
          </Text>
        </View>

        {/* ==================== AVATAR ==================== */}
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <Image
            source={{ uri: personalInfo.avatar }}
            style={{ 
              width: 100, 
              height: 110, 
              borderRadius: 64, 
              borderWidth: 4, 
              borderColor: 'white' 
            }}
          />
        </View>

        {/* ==================== NOMBRE Y TÍTULO ==================== */}
        <View style={{ alignItems: 'center', marginTop: 16, paddingHorizontal: 20 }}>
          <Text style={{ 
            fontSize: 26, 
            fontWeight: 'bold', 
            color: '#111827',
            textAlign: 'center'
          }}>
            {personalInfo.name}
          </Text>
          <Text style={{ 
            fontSize: 18, 
            color: '#6b7280', 
            marginTop: 4 
          }}>
            {personalInfo.title}
          </Text>
        </View>

        {/* ==================== CONTACTO ==================== */}
        <View style={{ 
          marginHorizontal: 20, 
          marginTop: 24, 
          backgroundColor: 'white', 
          borderRadius: 12, 
          padding: 20, 
          borderWidth: 1, 
          borderColor: '#e5e7eb',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          {contacts.map((contact, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: index < contacts.length - 1 ? 16 : 0
              }}
            >
              <Text style={{ fontSize: 24, marginRight: 12 }}>{contact.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: '#9ca3af' }}>{contact.label}</Text>
                <Text style={{ 
                  fontSize: 15, 
                  color: '#111827', 
                  fontWeight: '500',
                  marginTop: 2
                }}>
                  {contact.value}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* ==================== SOBRE MÍ ==================== */}
        <View style={{ 
          marginHorizontal: 20, 
          marginTop: 16, 
          backgroundColor: 'white', 
          borderRadius: 12, 
          padding: 20, 
          borderWidth: 1, 
          borderColor: '#e5e7eb',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: 'bold', 
            color: '#111827', 
            marginBottom: 12 
          }}>
            📖 Sobre Mí
          </Text>
          <Text style={{ 
            fontSize: 15, 
            color: '#4b5563', 
            lineHeight: 24 
          }}>
            {personalInfo.bio}
          </Text>
        </View>

        {/* ==================== SEPARADOR ==================== */}
        <View style={{ 
          height: 1, 
          backgroundColor: '', 
          marginHorizontal: 20, 
          marginVertical: 32 
        }} />

        {/* ==================== MIS HABILIDADES ==================== */}
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ 
            fontSize: 22, 
            fontWeight: 'bold', 
            color: '#111827', 
            marginBottom: 16 
          }}>
            💪 Mis Habilidades
          </Text>
          {skills.map((skill) => (
            <SkillCard key={skill.id} emoji={skill.emoji} name={skill.name} />
          ))}
        </View>

        {/* ==================== SEPARADOR ==================== */}
        <View style={{ 
          height: 1, 
          backgroundColor: '#0404e2', 
          marginHorizontal: 20, 
          marginVertical: 32 
        }} />

        {/* ==================== MIS PROYECTOS ==================== */}
        <View style={{ marginHorizontal: 20, marginBottom: 40 }}>
          <Text style={{ 
            fontSize: 22, 
            fontWeight: 'bold', 
            color: '#111827', 
            marginBottom: 16 
          }}>
            🚀 Mis Proyectos
          </Text>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              emoji={project.emoji}
              title={project.title}
              description={project.description}
              tags={project.tags}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}