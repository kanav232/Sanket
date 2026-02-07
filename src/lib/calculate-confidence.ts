
import { Incident, ValidationMetrics } from './types';

interface ConfidenceInput {
    baseSeverity: Incident['severity'];
    metrics: ValidationMetrics;
}

export const calculateConfidence = ({ baseSeverity, metrics }: ConfidenceInput): number => {
    let score = 0;

    // 1. Base Score from Severity (Initial AI Assessment)
    switch (baseSeverity) {
        case 'critical': score = 0.6; break;
        case 'severe': score = 0.5; break;
        case 'moderate': score = 0.4; break;
        case 'minor': score = 0.3; break;
        default: score = 0.2;
    }

    // 2. Volume Boost (Logarithmic)
    // More posts = higher confidence, but diminishing returns
    if (metrics.postCount > 1) {
        score += Math.log(metrics.postCount) * 0.1;
    }

    // 3. Verified Source Boost
    // Each verified post adds significant confidence
    if (metrics.verifiedPostCount > 0) {
        score += metrics.verifiedPostCount * 0.15;
    }

    // 4. Relevant Media Boost
    // Validated images/videos are strong evidence
    if (metrics.relevantMediaCount > 0) {
        score += metrics.relevantMediaCount * 0.2;
    }

    // Cap at 0.99 (99%)
    return Math.min(Math.round(score * 100) / 100, 0.99);
};
