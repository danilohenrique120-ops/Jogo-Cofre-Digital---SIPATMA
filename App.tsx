
import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Lock, Unlock, AlertCircle, CheckCircle2, Cpu, 
  Settings, HardHat, Glasses, Footprints, Hand, Info, Megaphone
} from 'lucide-react';
import { QUESTIONS } from './constants';
import { GameState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentQuestion = QUESTIONS[currentStep];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameState !== GameState.PLAYING) return;

    const formattedInput = inputValue.trim().toUpperCase();
    const correctAnswer = currentQuestion.answer.toUpperCase();

    if (formattedInput === correctAnswer) {
      handleSuccess();
    } else {
      handleError();
    }
  };

  const handleSuccess = () => {
    setShowSuccessOverlay(true);
    setTimeout(() => {
      setShowSuccessOverlay(false);
      setInputValue('');
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setGameState(GameState.VICTORY);
      }
    }, 1000);
  };

  const handleError = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const startGame = () => {
    setGameState(GameState.PLAYING);
    setCurrentStep(0);
    setInputValue('');
  };

  useEffect(() => {
    if (gameState === GameState.PLAYING && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState, currentStep]);

  if (gameState === GameState.VICTORY) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-green-600 via-green-800 to-green-950 flex flex-col items-center justify-center p-6 text-center z-[100] overflow-hidden">
        {/* Faixas Industriais de Vitória */}
        <div className="absolute top-0 w-full safety-stripe opacity-50"></div>
        <div className="absolute bottom-0 w-full safety-stripe opacity-50"></div>
        
        {/* Brilho de Fundo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.4)_0%,_transparent_70%)] pointer-events-none animate-pulse"></div>

        <div className="relative mb-6">
          <div className="absolute -inset-16 bg-white/20 blur-3xl rounded-full animate-ping"></div>
          <Shield className="w-48 h-48 text-white relative drop-shadow-[0_0_40px_rgba(255,255,255,0.8)]" />
        </div>
        
        <div className="relative space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter drop-shadow-lg font-['Orbitron']">
            SISTEMA LIBERADO!
          </h1>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl max-w-xl mx-auto transform hover:scale-105 transition-transform duration-500">
            <div className="flex items-center justify-center gap-4 mb-4 text-facc15">
              <Megaphone className="w-8 h-8 animate-bounce" />
              <p className="text-xl md:text-2xl font-bold uppercase tracking-widest">Atenção Colaborador:</p>
            </div>
            <p className="text-3xl md:text-5xl font-black text-white leading-tight mb-2">
              GRITE A FRASE:
            </p>
            <p className="text-4xl md:text-6xl font-black text-facc15 underline decoration-white/30 tracking-tight">
              "SEGURANÇA É VALOR"
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => setGameState(GameState.START)}
          className="relative mt-12 bg-[#facc15] text-black font-black py-5 px-16 rounded-2xl text-2xl shadow-[0_10px_0_rgb(161,98,7)] hover:translate-y-[2px] hover:shadow-[0_8px_0_rgb(161,98,7)] active:translate-y-[10px] active:shadow-none transition-all flex items-center gap-4 border-2 border-black/10"
        >
          <Settings className="w-7 h-7 animate-spin" />
          REINICIAR PROTOCOLO
        </button>

        <div className="mt-8 text-white/40 font-black text-xs tracking-[0.5em] uppercase">
          SIPATEVA // MISSÃO CUMPRIDA
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl px-4 py-8">
      <div className={`vault-frame transition-all duration-300 ${isShaking ? 'animate-shake border-red-500' : ''}`}>
        
        {/* Faixa de Segurança Superior */}
        <div className="safety-stripe"></div>
        
        {/* Painel Interno */}
        <div className="p-6 md:p-10">
          
          {/* Cabeçalho Tecnológico */}
          <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-900/30 rounded border border-purple-500/30">
                <Cpu className="text-purple-400 w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h2 className="text-xs font-black tracking-[0.3em] text-zinc-500 uppercase">Industrial Core</h2>
                <h2 className="text-sm font-bold tracking-widest text-zinc-300 font-['Orbitron']">SIPATEVA v3.0</h2>
              </div>
            </div>
            
            {/* Ícones de Segurança Laterais */}
            <div className="flex gap-4 opacity-40">
              <HardHat className="w-5 h-5" />
              <Glasses className="w-5 h-5" />
              <Hand className="w-5 h-5" />
            </div>
          </div>

          {gameState === GameState.START ? (
            <div className="text-center py-8 space-y-10">
              <div className="relative inline-block">
                 <div className="absolute -inset-10 bg-purple-600/20 blur-3xl rounded-full"></div>
                 <div className="relative bg-zinc-900 p-8 rounded-full border-2 border-facc15/30 shadow-[0_0_30px_rgba(250,204,21,0.1)]">
                   <Lock className="w-20 h-20 text-facc15 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                 </div>
                 {/* Ícones Orbitais de EPI */}
                 <HardHat className="absolute -top-4 -right-4 w-8 h-8 text-zinc-600" />
                 <Footprints className="absolute -bottom-4 -left-4 w-8 h-8 text-zinc-600" />
              </div>

              <div>
                <h1 className="text-4xl font-black text-white mb-4 font-['Orbitron'] tracking-tighter">ACESSO RESTRITO</h1>
                <p className="text-zinc-400 max-w-sm mx-auto font-medium text-sm leading-relaxed">
                  Valide seus conhecimentos de segurança para destravar o cofre digital da unidade.
                </p>
              </div>

              <button 
                onClick={startGame}
                className="group relative w-full md:w-auto bg-green-600 hover:bg-green-500 text-white font-black py-5 px-16 rounded-xl text-xl transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)] active:scale-95 flex items-center justify-center gap-4 mx-auto border-b-4 border-green-800"
              >
                AUTENTICAR <Settings className="group-hover:rotate-180 transition-transform duration-700 w-6 h-6" />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Status Bar */}
              <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase">Setor de Segurança Industrial</span>
                <div className="flex gap-2">
                  {QUESTIONS.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-1.5 w-8 rounded-full transition-all duration-500 ${idx < currentStep ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : idx === currentStep ? 'bg-[#facc15] shadow-[0_0_10px_rgba(250,204,21,0.8)] animate-pulse' : 'bg-zinc-800'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Terminal de Questão */}
              <div className="display-lcd p-6 rounded-lg border-l-4 border-[#facc15] relative overflow-hidden">
                 <div className="absolute top-2 right-2 flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500/50"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-500/50 animate-pulse"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500/50"></span>
                 </div>
                 <div className="text-[10px] text-[#facc15]/60 mb-3 font-black tracking-[0.3em] flex items-center gap-2">
                   <Info className="w-3 h-3" /> MÓDULO DE SEGURANÇA {currentStep + 1}
                 </div>
                 <p className="text-xl md:text-2xl font-bold text-zinc-100 leading-tight font-['JetBrains_Mono']">
                   {currentQuestion.text}
                 </p>
              </div>

              {/* Alerta de Dica Estilizado */}
              <div className="bg-[#facc15]/5 border border-[#facc15]/20 p-4 rounded-lg flex items-center gap-4">
                <div className="bg-[#facc15]/20 p-2 rounded text-[#facc15]">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-[#facc15]/80 uppercase tracking-wider leading-relaxed">
                  <span className="opacity-50">Dica:</span> {currentQuestion.hint}
                </div>
              </div>

              {/* Área de Entrada */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input 
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="DIGITE A CHAVE..."
                    className={`w-full bg-black/60 border-2 border-zinc-800 rounded-xl py-6 px-6 text-3xl font-black tracking-[0.4em] text-center uppercase focus:outline-none focus:border-[#facc15]/50 transition-all placeholder:text-zinc-800 ${isShaking ? 'text-red-500' : 'text-zinc-100'}`}
                    autoComplete="off"
                  />
                  {showSuccessOverlay && (
                     <div className="absolute inset-0 bg-green-600 rounded-xl flex items-center justify-center animate-pulse z-20">
                        <CheckCircle2 className="text-white w-16 h-16" />
                     </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setInputValue('')}
                    className="bg-zinc-800/50 hover:bg-zinc-800 text-zinc-500 font-black py-5 rounded-xl transition-all border border-zinc-700/30 active:scale-95 text-sm tracking-widest uppercase"
                  >
                    Resetar
                  </button>
                  <button 
                    type="submit"
                    className="bg-[#facc15] hover:bg-yellow-300 text-black font-black py-5 rounded-xl transition-all shadow-[0_0_20px_rgba(250,204,21,0.2)] active:scale-95 flex items-center justify-center gap-3 text-sm tracking-widest uppercase border-b-4 border-yellow-600"
                  >
                    Validar <Unlock className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Rodapé do Painel */}
              <div className="flex items-center justify-between pt-4 opacity-30">
                <div className="flex gap-3">
                  <HardHat className="w-4 h-4" />
                  <Glasses className="w-4 h-4" />
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.5em]">Protocolo SIPATEVA // 2024</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Faixa de Segurança Inferior */}
        <div className="safety-stripe"></div>
      </div>
    </div>
  );
};

export default App;
