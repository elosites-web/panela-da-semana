import React from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Fundo atmosférico contínuo e sutil para toda a aplicação.
 * Ilustrações botânicas leves em SVG, curvas sutis de vapor e gradientes orgânicos
 * usando apenas animações compostas (transform e opacity) e respeito a prefers-reduced-motion.
 */
export const AtmosphericBackground: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const anim = (className: string) =>
    prefersReducedMotion ? 'atmo-layer' : `atmo-layer ${className}`;

  return (
    <div
      aria-hidden="true"
      data-testid="atmospheric-background"
      data-reduced-motion={prefersReducedMotion ? 'true' : 'false'}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* Gradientes orgânicos de base (calor culinário e frescor botânico sem blur dinâmico) */}
      <div
        className={`absolute -top-32 -left-24 w-[420px] h-[420px] md:w-[680px] md:h-[680px] rounded-full will-change-transform ${anim('atmo-drift-a')}`}
        style={{
          background:
            'radial-gradient(circle, rgba(100, 122, 82, 0.14) 0%, rgba(100, 122, 82, 0.05) 45%, transparent 72%)',
        }}
      />

      <div
        className={`absolute top-[28%] -right-28 w-[380px] h-[380px] md:w-[620px] md:h-[620px] rounded-full will-change-transform ${anim('atmo-drift-b')}`}
        style={{
          background:
            'radial-gradient(circle, rgba(201, 111, 74, 0.12) 0%, rgba(201, 111, 74, 0.04) 45%, transparent 72%)',
        }}
      />

      <div
        className={`hidden md:block absolute -bottom-36 left-[12%] w-[640px] h-[640px] rounded-full will-change-transform ${anim('atmo-drift-c')}`}
        style={{
          background:
            'radial-gradient(circle, rgba(52, 75, 53, 0.10) 0%, rgba(248, 243, 233, 0.35) 46%, transparent 74%)',
        }}
      />

      {/* Padrão orgânico de curvas botânicas / contornos no topo esquerdo (Desktop) */}
      <svg
        viewBox="0 0 260 260"
        fill="none"
        className={`hidden md:block absolute top-[12%] -left-10 w-64 h-64 opacity-[0.16] will-change-transform ${anim('atmo-breathe-slow')}`}
      >
        <path
          d="M20 180C56 120 112 72 198 48"
          stroke="#647A52"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M36 212C76 146 138 98 228 74"
          stroke="#C96F4A"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeDasharray="3 7"
        />
        <circle cx="152" cy="84" r="2.2" fill="#C96F4A" fillOpacity="0.65" />
        <circle cx="184" cy="64" r="1.6" fill="#344B35" fillOpacity="0.65" />
      </svg>

      {/* Ramo de alecrim fino no canto superior direito (Mobile reduzido e Desktop completo) */}
      <svg
        viewBox="0 0 220 280"
        fill="none"
        className={`absolute top-[11%] -right-6 sm:right-[1%] lg:right-[2.5%] w-28 sm:w-36 lg:w-48 opacity-[0.17] md:opacity-[0.22] will-change-transform ${anim('atmo-sway-a')}`}
      >
        {/* Haste principal */}
        <path
          d="M170 245C156 196 138 148 110 100C92 68 72 42 52 22"
          stroke="#344B35"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        {/* Folhinhas finas de alecrim */}
        <path d="M150 202C132 194 114 198 100 208" stroke="#647A52" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M152 194C166 178 182 172 196 174" stroke="#344B35" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M138 168C118 160 98 165 82 176" stroke="#344B35" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M140 160C156 144 174 138 190 142" stroke="#647A52" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M122 132C102 124 84 128 68 139" stroke="#647A52" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M125 124C142 108 160 102 178 106" stroke="#344B35" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M104 98C86 90 68 94 54 104" stroke="#344B35" strokeWidth="1.15" strokeLinecap="round" />
        <path d="M106 90C122 76 140 70 156 74" stroke="#647A52" strokeWidth="1.15" strokeLinecap="round" />
        <path d="M84 66C70 58 54 60 42 68" stroke="#647A52" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M86 58C100 46 116 42 130 46" stroke="#344B35" strokeWidth="1.1" strokeLinecap="round" />
        {/* Pequenos brotos em terracota */}
        <circle cx="52" cy="22" r="2.2" fill="#C96F4A" fillOpacity="0.7" />
        <circle cx="100" cy="208" r="1.6" fill="#C96F4A" fillOpacity="0.55" />
        <circle cx="190" cy="142" r="1.6" fill="#C96F4A" fillOpacity="0.55" />
      </svg>

      {/* Curvas sutis de vapor culinário — lado direito (Desktop) */}
      <svg
        viewBox="0 0 120 260"
        fill="none"
        className={`hidden md:block top-[24%] right-[7.5%] absolute w-20 lg:w-24 h-48 opacity-[0.18] will-change-transform ${anim('atmo-steam-a')}`}
      >
        <path
          d="M42 238C24 202 60 170 40 132C22 96 58 64 40 24"
          stroke="#C96F4A"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M78 244C62 212 94 182 76 144C58 108 90 78 74 36"
          stroke="#647A52"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
      </svg>

      {/* Ramo com folhas de louro delicadas — margem esquerda intermediária (Desktop) */}
      <svg
        viewBox="0 0 220 300"
        fill="none"
        className={`hidden md:block absolute top-[38%] -left-4 lg:left-[1.5%] w-36 lg:w-48 opacity-[0.20] will-change-transform ${anim('atmo-sway-b')}`}
      >
        {/* Haste curva */}
        <path
          d="M36 270C54 210 78 156 108 102C126 70 144 44 166 24"
          stroke="#344B35"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        {/* Folha 1 (esquerda inferior) */}
        <path
          d="M52 220C22 204 14 176 30 156C54 166 64 192 52 220Z"
          fill="#647A52"
          fillOpacity="0.10"
          stroke="#344B35"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <path d="M52 220C42 198 36 178 30 156" stroke="#647A52" strokeWidth="0.9" strokeLinecap="round" />

        {/* Folha 2 (direita inferior) */}
        <path
          d="M66 188C98 184 124 162 124 136C96 138 74 160 66 188Z"
          fill="#647A52"
          fillOpacity="0.08"
          stroke="#647A52"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <path d="M66 188C88 170 106 154 124 136" stroke="#344B35" strokeWidth="0.9" strokeLinecap="round" />

        {/* Folha 3 (esquerda superior) */}
        <path
          d="M90 138C60 124 50 96 66 74C92 84 102 110 90 138Z"
          fill="#647A52"
          fillOpacity="0.10"
          stroke="#344B35"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <path d="M90 138C80 116 74 96 66 74" stroke="#647A52" strokeWidth="0.9" strokeLinecap="round" />

        {/* Folha 4 (direita superior) */}
        <path
          d="M112 98C144 94 168 72 168 48C142 50 120 72 112 98Z"
          fill="#C96F4A"
          fillOpacity="0.07"
          stroke="#647A52"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <path d="M112 98C134 80 152 64 168 48" stroke="#344B35" strokeWidth="0.9" strokeLinecap="round" />

        {/* Folha apical */}
        <path
          d="M140 54C138 30 150 14 168 12C176 32 162 50 140 54Z"
          fill="#647A52"
          fillOpacity="0.09"
          stroke="#344B35"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </svg>

      {/* Curvas sutis de vapor — lado esquerdo inferior (Desktop grande) */}
      <svg
        viewBox="0 0 110 220"
        fill="none"
        className={`hidden lg:block absolute bottom-[22%] left-[5%] w-20 h-44 opacity-[0.16] will-change-transform ${anim('atmo-steam-b')}`}
      >
        <path
          d="M36 202C52 170 20 142 38 108C54 76 24 48 40 16"
          stroke="#647A52"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M72 208C86 178 58 152 74 120C88 90 62 64 76 30"
          stroke="#C96F4A"
          strokeWidth="1.05"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />
      </svg>

      {/* Folhas botânicas de manjericão/horta no canto inferior esquerdo (Mobile simplificado e Desktop) */}
      <svg
        viewBox="0 0 220 220"
        fill="none"
        className={`absolute bottom-[7%] -left-6 sm:left-[1.5%] w-28 sm:w-36 lg:w-44 opacity-[0.16] md:opacity-[0.20] will-change-transform ${anim('atmo-sway-c')}`}
      >
        <path
          d="M28 196C62 162 96 128 134 94"
          stroke="#344B35"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        {/* Folha orgânica 1 */}
        <path
          d="M72 152C52 128 54 96 76 80C98 96 98 130 72 152Z"
          fill="#647A52"
          fillOpacity="0.10"
          stroke="#344B35"
          strokeWidth="1.15"
        />
        <path d="M72 152C73 128 74 104 76 80" stroke="#647A52" strokeWidth="0.9" />
        {/* Folha orgânica 2 */}
        <path
          d="M104 122C132 122 156 106 164 82C138 78 114 96 104 122Z"
          fill="#C96F4A"
          fillOpacity="0.08"
          stroke="#647A52"
          strokeWidth="1.15"
        />
        <path d="M104 122C124 108 144 96 164 82" stroke="#344B35" strokeWidth="0.9" />
        {/* Pontos semente/pimenta-do-reino */}
        <circle cx="148" cy="64" r="2" fill="#C96F4A" fillOpacity="0.65" />
        <circle cx="162" cy="54" r="1.5" fill="#344B35" fillOpacity="0.6" />
        <circle cx="136" cy="52" r="1.4" fill="#647A52" fillOpacity="0.6" />
      </svg>

      {/* Gavinha delicada e folhas na lateral direita inferior (Desktop grande) */}
      <svg
        viewBox="0 0 220 240"
        fill="none"
        className={`hidden lg:block absolute top-[58%] right-[2%] w-40 opacity-[0.19] will-change-transform ${anim('atmo-sway-a')}`}
      >
        <path
          d="M192 216C166 176 142 138 124 96C110 64 90 42 62 32"
          stroke="#647A52"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Gavinha em espiral sutil */}
        <path
          d="M124 96C106 86 98 68 110 58C120 50 132 60 124 70"
          stroke="#C96F4A"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
        <path
          d="M150 150C122 146 102 126 104 102C128 104 146 124 150 150Z"
          fill="#647A52"
          fillOpacity="0.09"
          stroke="#344B35"
          strokeWidth="1.15"
        />
        <path
          d="M168 178C194 166 208 140 200 116C176 124 162 150 168 178Z"
          fill="#647A52"
          fillOpacity="0.08"
          stroke="#647A52"
          strokeWidth="1.15"
        />
        <circle cx="62" cy="32" r="2.2" fill="#C96F4A" fillOpacity="0.65" />
      </svg>

      {/* Arcos orgânicos sutis no canto inferior direito (Desktop) */}
      <svg
        viewBox="0 0 240 200"
        fill="none"
        className={`hidden md:block absolute bottom-[4%] -right-8 w-56 h-48 opacity-[0.14] will-change-transform ${anim('atmo-breathe-slow')}`}
      >
        <path
          d="M30 170C76 122 142 94 220 88"
          stroke="#344B35"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M64 190C112 146 168 122 232 118"
          stroke="#C96F4A"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeDasharray="4 8"
        />
      </svg>

      {/* Curva sutil de vapor no canto inferior direito (Mobile apenas) */}
      <svg
        viewBox="0 0 80 150"
        fill="none"
        className={`md:hidden absolute bottom-[18%] right-[2%] w-14 h-28 opacity-[0.13] will-change-transform ${anim('atmo-steam-a')}`}
      >
        <path
          d="M36 138C22 114 48 92 34 68C20 46 44 26 32 8"
          stroke="#C96F4A"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
