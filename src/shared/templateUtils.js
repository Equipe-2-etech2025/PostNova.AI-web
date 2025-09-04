export const processTemplate = (htmlTemplate, data) => {
    if (!htmlTemplate || !data) {
        return htmlTemplate || '';
    }

    let processedHtml = htmlTemplate;

    // Fonction récursive pour traiter les placeholders
    const replacePlaceholders = (template, context) => {
        // Pattern pour capturer ${...}
        return template.replace(/\$\{([^}]+)\}/g, (match, expression) => {
            try {
                // Nettoyer l'expression (enlever les espaces)
                const cleanExpression = expression.trim();
                
                // Évaluer l'expression dans le contexte des données
                const value = evaluateExpression(cleanExpression, context);
                
                return value !== undefined ? value : match; // Garde le placeholder si pas de valeur
            } catch (error) {
                console.warn(`Erreur lors du traitement du placeholder ${match}:`, error);
                return match; // Garde le placeholder en cas d'erreur
            }
        });
    };

    // Fonction pour évaluer une expression comme "hero.title" ou "sections[0].title"
    const evaluateExpression = (expression, context) => {
        try {
            // Séparer l'expression par les points
            const parts = expression.split('.');
            let current = context;

            for (let part of parts) {
                if (current === null || current === undefined) {
                    return undefined;
                }

                // Gérer les indices de tableau comme "sections[0]"
                const arrayMatch = part.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\[(\d+)\]$/);
                if (arrayMatch) {
                    const [, arrayName, index] = arrayMatch;
                    current = current[arrayName] && current[arrayName][parseInt(index)];
                } else {
                    current = current[part];
                }
            }

            return current;
        } catch (error) {
            console.warn(`Erreur lors de l'évaluation de l'expression "${expression}":`, error);
            return undefined;
        }
    };

    return replacePlaceholders(processedHtml, data);
};

/**
 * Fonction helper pour traiter une réponse complète de l'API landing page
 */
export const processLandingPageTemplate = (apiResponse) => {
    if (!apiResponse || !apiResponse.success) {
        return null;
    }

    const { template, html, hero, sections, footer } = apiResponse.data.content;

    // Si on a une structure template, l'utiliser
    if (template && template.html && template.data) {
        return {
            html: processTemplate(template.html, template.data),
            data: template.data
        };
    }

    // Sinon, utiliser la structure plate
    if (html && (hero || sections || footer)) {
        const data = { hero, sections, footer };
        return {
            html: processTemplate(html, data),
            data
        };
    }

    return null;
};