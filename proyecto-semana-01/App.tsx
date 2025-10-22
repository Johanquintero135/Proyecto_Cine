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
  avatar: 'blob:https://web.whatsapp.com/234c26bc-7629-4b8f-bf10-2b6d6c655634',
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
              width: 128, 
              height: 128, 
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