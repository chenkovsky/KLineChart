/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Coordinate from '../common/Coordinate'
import { CrosshairDirectionStyle } from '../common/Options'

import View from './View'

export default class CrosshairLineView extends View {
  drawImp (ctx: CanvasRenderingContext2D): void {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const bounding = widget.getBounding()
    const chartStore = widget.getPane().getChart().getChartStore()
    const crosshair = chartStore.getCrosshairStore().get()
    const styles = chartStore.getStyles().crosshair
    if (crosshair.paneId !== undefined && styles.show) {
      if (crosshair.paneId === pane.getId()) {
        const y = crosshair.y as number
        this._drawLine(
          ctx,
          [
            { x: 0, y },
            { x: bounding.width, y }
          ],
          styles.horizontal
        )
      }
      const x = crosshair.realX as number
      this._drawLine(
        ctx,
        [
          { x, y: 0 },
          { x, y: bounding.height }
        ],
        styles.horizontal
      )
    }
  }

  private _drawLine (ctx: CanvasRenderingContext2D, coordinates: Coordinate[], styles: CrosshairDirectionStyle): void {
    if (styles.show) {
      const lineStyles = styles.line
      if (lineStyles.show) {
        this.createFigure('line', { coordinates }, lineStyles)?.draw(ctx)
      }
    }
  }
}
