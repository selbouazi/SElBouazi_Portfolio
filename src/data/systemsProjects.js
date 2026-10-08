/**
 * BLOQUE A — Sistemas y redes (va primero en la sección de Proyectos).
 *
 * Para publicar una ficha: rellenar description, stack real, enlace al repo/README
 * (`url` y/o `github`) y, si hay, la referencia al diagrama, y poner `enabled: true`.
 * Mientras `enabled` sea `false`, la ficha NO se renderiza en producción.
 * Si ninguna está activada, se muestra el mensaje honesto de `projects.systems_empty`.
 * Cualquier texto marcado con "TODO:" se filtra y nunca llega a la web.
 */
const systemsProjects = [
  {
    id: 'ad-domain',
    enabled: false,
    url: '',
    github: '',
    es: {
      name: 'Dominio con Active Directory en Windows Server',
      description: 'TODO: usuarios, GPO, carpetas compartidas.',
      stack: ['Windows Server', 'Active Directory', 'GPO'],
      highlights: [],
    },
    en: {
      name: 'Active Directory domain on Windows Server',
      description: 'TODO: users, GPOs, shared folders.',
      stack: ['Windows Server', 'Active Directory', 'GPO'],
      highlights: [],
    },
  },
  {
    id: 'linux-server',
    enabled: false,
    url: '',
    github: '',
    es: {
      name: 'Servidor Linux (Debian/Ubuntu)',
      description: 'TODO: SSH, Apache/Nginx, DNS, DHCP, Samba, copias de seguridad con script en bash.',
      stack: ['Debian/Ubuntu', 'SSH', 'Apache/Nginx', 'DNS', 'DHCP', 'Samba', 'Bash'],
      highlights: [],
    },
    en: {
      name: 'Linux server (Debian/Ubuntu)',
      description: 'TODO: SSH, Apache/Nginx, DNS, DHCP, Samba, backup script in bash.',
      stack: ['Debian/Ubuntu', 'SSH', 'Apache/Nginx', 'DNS', 'DHCP', 'Samba', 'Bash'],
      highlights: [],
    },
  },
  {
    id: 'network-lab',
    enabled: false,
    url: '',
    github: '',
    es: {
      name: 'Red con VLANs y routing o firewall pfSense/OPNsense',
      description: 'TODO: Packet Tracer, VLANs y routing, o firewall pfSense/OPNsense.',
      stack: ['Packet Tracer', 'VLANs', 'Routing', 'pfSense/OPNsense'],
      highlights: [],
    },
    en: {
      name: 'VLANs and routing network or pfSense/OPNsense firewall',
      description: 'TODO: Packet Tracer, VLANs and routing, or pfSense/OPNsense firewall.',
      stack: ['Packet Tracer', 'VLANs', 'Routing', 'pfSense/OPNsense'],
      highlights: [],
    },
  },
  {
    id: 'homelab',
    enabled: false,
    url: '',
    github: '',
    es: {
      name: 'Homelab',
      description: 'TODO: virtualización, VPN, monitorización.',
      stack: ['Virtualización', 'VPN', 'Monitorización'],
      highlights: [],
    },
    en: {
      name: 'Homelab',
      description: 'TODO: virtualization, VPN, monitoring.',
      stack: ['Virtualization', 'VPN', 'Monitoring'],
      highlights: [],
    },
  },
]

export default systemsProjects
