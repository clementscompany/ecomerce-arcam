export function themesystem(theme, colorTheme){
 
     document.documentElement.setAttribute("data-theme", theme);
    
    if (window.Capacitor) {

        const { StatusBar } = window.Capacitor.Plugins;
        switch (theme) {
            case "light":
                StatusBar.setStyle({
                    style: 'LIGTH'
                    });
            break;

            case "darck":
                StatusBar.setStyle({
                    style: 'DARK'
                    });
            break       
        
            default:
                break;
        }
        StatusBar.setBackgroundColor({ color: colorTheme });
    } else {
    console.error('Capacitor não está disponível. A mudança de cor da StatusBar só é suportada em dispositivos móveis.');
    }

} 

export function AppLication(){
    if (window.Capacitor) {
        const { App } = window.Capacitor.Plugins;
        App.addListener('backButton', async () => {
            if (window.history.length > 1) {
                window.history.back();
            } else{
                try {
                    await App.minimizeApp();
                } catch (error) {
                    alert("Erro ao tentar sair: " + error);
                }
            }

            return listener.remove();
        });
    }
}