Feature: Connexion de l'utilisateur

  Scenario: L'utilisateur peut se connecter avec des identifiants valides
    Given l'utilisateur est sur la page de connexion
    When l'utilisateur entre un email et un mot de passe valides
    Then l'utilisateur est redirigé vers la page d'accueil

  Scenario: L'utilisateur ne peut pas se connecter avec des identifiants invalides
    Given l'utilisateur est sur la page de connexion
    When l'utilisateur entre un email et un mot de passe invalides
    Then l'utilisateur voit un message d'erreur
