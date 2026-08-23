import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ConsentService } from "@solvenza/cookies-compliance/angular";

@Component({
  selector: "app-cookie-policy",
  standalone: true,
  template: `
    <div style="max-width: 800px; margin: 2rem auto; font-family: sans-serif;">
      <h1>Declaración de Cookies (Solvenza Cookies Compliance)</h1>
      <div #policyContainer></div>
    </div>
  `,
})
export class CookiePolicyComponent implements OnInit {
  @ViewChild("policyContainer", { static: true })
  policyContainer!: ElementRef<HTMLDivElement>;

  constructor(private consentService: ConsentService) {}

  ngOnInit() {
    this.consentService.getConsent();
  }
}
