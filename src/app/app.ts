import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Descricao } from './descricao/descricao';
import { UsoApi } from './uso-api/uso-api';

@Component({
  selector: 'app-root',
  imports: [Descricao, UsoApi],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App { }
