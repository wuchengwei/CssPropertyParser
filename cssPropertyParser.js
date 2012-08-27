var parser, valueType,
    relLengthRegExp = /^([+-]?[0-9]+|[+-]?[0-9]*\.[0-9]+)(em|ex|ch|rem|vw|vh|vmin|%)$/i,
    absLengthRegExp = /^([+-]?[0-9]+|[+-]?[0-9]*\.[0-9]+)(cm|mm|in|pt|pc|px)$/i,
    numRegExp = /^[+-]?[0-9]+|[+-]?[0-9]*\.[0-9]+$/;

valueType = {
    'Invalid': 0,
    'RelativeLength': 1,
    'AbsoluteLength': 2,
    'Number': 3,
    'Color': 4,
    'None': 5,
    'Normal': 6,
    'Auto': 7,
    'Inherit': 8,
    'BorderWidthKeyword': 9, // thin | medium | thick
    'BorderStyleKeyword': 10, // none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset
    'FontFamily': 11,
    'FontWeightKeyword': 12,
    'FontStretchKeyword': 13,
    'FontStyleKeyword': 14,
    'FontSizeKeyword': 15,
    'FontSynthesisKeyword': 16,
    'FontVariantKeyword': 17,
    'FontKeyword': 18,
    'LineHeightKeyword': 19,
    'BackgroundSizeKeyword': 20,
    'BackgroundPositionKeyword': 21,
    'BackgroundRepeatKeyword': 22,
    'BackgroundAttachmentKeyword': 23,
    'BackgroundBoxKeyword': 24,
    'URI': 25,
    'ImageFunction': 26,
    'ImageGradient': 27
};

parser = {
    'width': function(value) {
        // http://www.w3.org/TR/CSS2/visudet.html#the-width-property
        value = value.trim();
        
        // Negative value is illegal.
        if (/^-/.test(value)) {
            return {"type": valueType.Invalid, "value": value};
        }
        if (relLengthRegExp.test(value)) {
            return {"type": valueType.RelativeLength, "value": value};
        } else if (absLengthRegExp.test(value) || value == '0') {
            return {"type": valueType.AbsoluteLength, "value": value};
        } else if (value.toLowerCase() == 'auto') {
            return {"type": valueType.Auto, "value": value};
        } else if (value.toLowerCase() == 'inherit') {
            return {"type": valueType.Inherit, "value": value};
        } else {
            return {"type": valueType.Invalid, "value": value};
        }
    },
    'min-width': function(value) {
        // http://www.w3.org/TR/CSS2/visudet.html#min-max-widths
        value = value.trim();
        
        // Negative value is illegal.
        if (/^-/.test(value)) {
            return {"type": valueType.Invalid, "value": value};
        }
        if (relLengthRegExp.test(value)) {
            return {"type": valueType.RelativeLength, "value": value};
        } else if (absLengthRegExp.test(value) || value == '0') {
            return {"type": valueType.AbsoluteLength, "value": value};
        } else if (value.toLowerCase() == 'inherit') {
            return {"type": valueType.Inherit, "value": value};
        } else {
            return {"type": valueType.Invalid, "value": value};
        }
    },
    'max-width': function(value) {
        // http://www.w3.org/TR/CSS2/visudet.html#min-max-widths
        value = value.trim();
        
        // Negative value is illegal.
        if (/^-/.test(value)) {
            return {"type": valueType.Invalid, "value": value};
        }
        if (relLengthRegExp.test(value)) {
            return {"type": valueType.RelativeLength, "value": value};
        } else if (absLengthRegExp.test(value) || value == '0') {
            return {"type": valueType.AbsoluteLength, "value": value};
        } else if (value.toLowerCase() == 'none') {
            return {"type": valueType.None, "value": value};
        } else if (value.toLowerCase() == 'inherit') {
            return {"type": valueType.Inherit, "value": value};
        } else {
            return {"type": valueType.Invalid, "value": value};
        }
    },
    'height': function(value) {
        // http://www.w3.org/TR/CSS2/visudet.html#the-height-property
        // the same as 'width'
        return parser['width'](value);
    },
    'min-height': function(value) {
        // http://www.w3.org/TR/CSS2/visudet.html#min-max-heights
        // the same as 'min-width'
        return parser['min-width'](value);
    },
    'max-height': function(value) {
        // http://www.w3.org/TR/CSS2/visudet.html#min-max-heights
        // the same as 'max-width'
        return parser['max-width'](value);
    },
    'line-height': function(value) {
        // http://www.w3.org/TR/CSS2/visudet.html#line-height
        value = value.trim();
        
        // Negative value is illegal.
        if (/^-/.test(value)) {
            return {"type": valueType.Invalid, "value": value};
        }
        if (relLengthRegExp.test(value)) {
            return {"type": valueType.RelativeLength, "value": value};
        } else if (absLengthRegExp.test(value) || value == '0') {
            return {"type": valueType.AbsoluteLength, "value": value};
        } else if (value.toLowerCase() == 'none') {
            return {"type": valueType.None, "value": value};
        } else if (value.toLowerCase() == 'inherit') {
            return {"type": valueType.Inherit, "value": value};
        } else {
            return {"type": valueType.Invalid, "value": value};
        }
    },
    'margin': function(value) {
        // http://www.w3.org/TR/CSS2/box.html#margin-properties
        var inheritValue = {"type": valueType.Inherit, "value": value},
            topValue, rightValue, bottomValue, leftValue, values;
        value = value.trim();
        
        if (value.toLowerCase() == 'inherit') {
            return {'top': inheritValue, 'right': inheritValue, 'bottom': inheritValue, 'left': inheritValue};
        } else {
            values = value.split(/\s+/);
            switch(values.length) {
            case 1:
                topValue = getMarginValue(values[0]);
                rightValue = getMarginValue(values[0]);
                bottomValue = getMarginValue(values[0]);
                leftValue = getMarginValue(values[0]);
                break;
            case 2:
                topValue = getMarginValue(values[0]);
                rightValue = getMarginValue(values[1]);
                bottomValue = getMarginValue(values[0]);
                leftValue = getMarginValue(values[1]);
                break;
            case 3:
                topValue = getMarginValue(values[0]);
                rightValue = getMarginValue(values[1]);
                bottomValue = getMarginValue(values[2]);
                leftValue = getMarginValue(values[1]);
                break;
            case 4:
                topValue = getMarginValue(values[0]);
                rightValue = getMarginValue(values[1]);
                bottomValue = getMarginValue(values[2]);
                leftValue = getMarginValue(values[3]);
                break;
            default:
                topValue = leftValue = bottomValue = rightValue = {"type": valueType.Invalid, "value": value};
            }
        }
        
        return {'top': topValue, 'right': rightValue, 'bottom': bottomValue, 'left': leftValue};
        
        function getMarginValue(v) {
            if (relLengthRegExp.test(v)) {
                return {"type": valueType.RelativeLength, "value": v};
            } else if (absLengthRegExp.test(v) || value == '0') {
                return {"type": valueType.AbsoluteLength, "value": v};
            } else if (v.toLowerCase() == 'auto') {
                return {"type": valueType.Auto, "value": v};
            } else {
                return {"type": valueType.Invalid, "value": v};
            }
        }
    },
    'margin-left': function(value) {
        // http://www.w3.org/TR/CSS2/box.html#margin-properties
        value = value.trim();
        if (relLengthRegExp.test(value)) {
            return {"type": valueType.RelativeLength, "value": value};
        } else if (absLengthRegExp.test(value) || value == '0') {
            return {"type": valueType.AbsoluteLength, "value": value};
        } else if (value.toLowerCase() == 'auto') {
            return {"type": valueType.Auto, "value": value};
        } else if (value.toLowerCase() == 'inherit') {
            return {"type": valueType.Inherit, "value": value};
        } else {
            return {"type": valueType.Invalid, "value": value};
        }
    },
    'margin-right': function(value) {
        // the same as margin-left
        return parser['margin-left'](value);
    },
    'margin-top': function(value) {
        // the same as margin-left
        return parser['margin-left'](value);
    },
    'margin-bottom': function(value) {
        // the same as margin-left
        return parser['margin-left'](value);
    },
    'padding': function(value) {
        // http://www.w3.org/TR/CSS2/box.html#padding-properties
        var inheritValue = {"type": valueType.Inherit, "value": value},
            topValue, rightValue, bottomValue, leftValue, values;
        value = value.trim();
        
        if (value.toLowerCase() == 'inherit') {
            return {'top': inheritValue, 'right': inheritValue, 'bottom': inheritValue, 'left': inheritValue};
        } else {
            values = value.split(/\s+/);
            switch(values.length) {
            case 1:
                topValue = getPaddingValue(values[0]);
                rightValue = getPaddingValue(values[0]);
                bottomValue = getPaddingValue(values[0]);
                leftValue = getPaddingValue(values[0]);
                break;
            case 2:
                topValue = getPaddingValue(values[0]);
                rightValue = getPaddingValue(values[1]);
                bottomValue = getPaddingValue(values[0]);
                leftValue = getPaddingValue(values[1]);
                break;
            case 3:
                topValue = getPaddingValue(values[0]);
                rightValue = getPaddingValue(values[1]);
                bottomValue = getPaddingValue(values[2]);
                leftValue = getPaddingValue(values[1]);
            case 4:
                topValue = getPaddingValue(values[0]);
                rightValue = getPaddingValue(values[1]);
                bottomValue = getPaddingValue(values[2]);
                leftValue = getPaddingValue(values[3]);
                break;
            default:
                topValue = leftValue = bottomValue = rightValue = {"type": valueType.Invalid, "value": value};
            }
        }
        
        return {'top': topValue, 'right': rightValue, 'bottom': bottomValue, 'left': leftValue};
        
        function getPaddingValue(v) {
            // Negative value is illegal.
            if (/^-/.test(v)) {
                return {"type": valueType.Invalid, "value": v};
            }
            if (relLengthRegExp.test(v)) {
                return {"type": valueType.RelativeLength, "value": v};
            } else if (absLengthRegExp.test(v) || value == '0') {
                return {"type": valueType.AbsoluteLength, "value": v};
            } else {
                return {"type": valueType.Invalid, "value": v};
            }
        }
    },
    'padding-left': function(value) {
        // http://www.w3.org/TR/CSS2/box.html#padding-properties
        value = value.trim();
        // Negative value is illegal.
        if (/^-/.test(value)) {
            return {"type": valueType.Invalid, "value": value};
        }
        if (relLengthRegExp.test(value)) {
            return {"type": valueType.RelativeLength, "value": value};
        } else if (absLengthRegExp.test(value) || value == '0') {
            return {"type": valueType.AbsoluteLength, "value": value};
        } else if (value.toLowerCase() == 'inherit') {
            return {"type": valueType.Inherit, "value": value};
        } else {
            return {"type": valueType.Invalid, "value": value};
        }
    },
    'padding-right': function(value) {
        // the same as padding-left
        return parser['padding-left'](value);
    },
    'padding-top': function(value) {
        // the same as padding-left
        return parser['padding-left'](value);
    },
    'padding-bottom': function(value) {
        // the same as padding-left
        return parser['padding-left'](value);
    },
    'left': function(value) {
        // http://www.w3.org/TR/CSS2/visuren.html#position-props
        value = value.trim();
        if (relLengthRegExp.test(value)) {
            return {"type": valueType.RelativeLength, "value": value};
        } else if (absLengthRegExp.test(value) || value == '0') {
            return {"type": valueType.AbsoluteLength, "value": value};
        } else if (value.toLowerCase() == 'auto') {
            return {"type": valueType.Auto, "value": value};
        } else if (value.toLowerCase() == 'inherit') {
            return {"type": valueType.Inherit, "value": value};
        } else {
            return {"type": valueType.Invalid, "value": value};
        }
    },
    'right': function(value) {
        // the same as left
        return parser['left'](value);
    },
    'top': function(value) {
        // the same as left
        return parser['left'](value);
    },
    'bottom': function(value) {
        // the same as left
        return parser['left'](value);
    },
    'border': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-shorthands
        var result = {},
            invalidValue, regExp, matchResult, tmpValue, tmpPropertyValue;
        tmpValue = value.trim() + ' ';
        regExp = /^(\w+\(.*?\)|[^\s]+)\s+/;
        while(tmpValue) {
            matchResult = tmpValue.match(regExp);
            if (matchResult) {
                tmpPropertyValue = isBorderWidthValue(matchResult[1]);
                if (tmpPropertyValue && !result.width) {
                    result.width = tmpPropertyValue;
                } else {
                    tmpPropertyValue = isBorderStyleValue(matchResult[1]);
                    if (tmpPropertyValue && !result.style) {
                        result.style = tmpPropertyValue;
                    } else {
                        tmpPropertyValue = isColorValue(matchResult[1]);
                        if (tmpPropertyValue && !result.color) {
                            result.color = tmpPropertyValue;
                        } else {
                            invalidValue = {"type": valueType.Invalid, "value": value};
                            return {'width': invalidValue, 'style': invalidValue, 'color': invalidValue};
                        }
                    }
                }
            } else {
                invalidValue = {"type": valueType.Invalid, "value": value};
                return {'width': invalidValue, 'style': invalidValue, 'color': invalidValue};
            }
            tmpValue = tmpValue.substring(matchResult[0].length);
        }
        return result;
    },
    'border-left': function(value) {
        // the same as border
        return parser['border'](value);
    },
    'border-right': function(value) {
        // the same as border
        return parser['border'](value);
    },
    'border-top': function(value) {
        // the same as border
        return parser['border'](value);
    },
    'border-bottom': function(value) {
        // the same as border
        return parser['border'](value);
    },
    'border-color': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-color
        var colorRegExp = /^([a-f]+|#[\da-f]{3}|#[\da-f]{6}|rgb\(.+?\)|rgba\(.+?\)|hsl\(.+?\)|hsla\(.+?\))\s+/i,
            values = [], tmpValue, matchResult, top, right, bottom, left;
        tmpValue = value.trim() + ' ';
        while(tmpValue) {
            matchResult = tmpValue.match(colorRegExp);
            if (matchResult) {
                values.push(matchResult[1]);
                tmpValue = tmpValue.substring(matchResult[0].length);
            } else {
                top = right = bottom = left = {"type": valueType.Invalid, "value": value};
                return {'top': top, 'right': right, 'bottom': bottom, 'left': left};
            }
        }
        switch(values.length) {
        case 1:
            top = getColorValue(values[0]);
            right = getColorValue(values[0]);
            bottom = getColorValue(values[0]);
            left = getColorValue(values[0]);
            break;
        case 2:
            top = getColorValue(values[0]);
            right = getColorValue(values[1]);
            bottom = getColorValue(values[0]);
            left = getColorValue(values[1]);
            break;
        case 3:
            top = getColorValue(values[0]);
            right = getColorValue(values[1]);
            bottom = getColorValue(values[2]);
            left = getColorValue(values[1]);
            break;
        case 4:
            top = getColorValue(values[0]);
            right = getColorValue(values[1]);
            bottom = getColorValue(values[2]);
            left = getColorValue(values[3]);
            break;
        default:
            top = right = bottom = left = {"type": valueType.Invalid, "value": value};
        }
        return {'top': top, 'right': right, 'bottom': bottom, 'left': left};

        function getColorValue(v) {
            var color = isColorValue(v);
            return color?color:{'type': valueType.Invalid, 'value': value};
        }
    },
    'border-top-color': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-color
        var color = isColorValue(value.trim());
        return color?color:{'type': valueType.Invalid, 'value': value};
    },
    'border-right-color': function(value) {
        // the same as border-top-color
        return parser['border-top-color'](value);
    },
    'border-bottom-color': function(value) {
        // the same as border-top-color
        return parser['border-top-color'](value);
    },
    'border-left-color': function(value) {
        // the same as border-top-color
        return parser['border-top-color'](value);
    },
    'border-style': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-style
        var top, right, bottom, left, values;
        values = value.split(/\s+/);
        switch(values.length) {
        case 1:
            top = getBorderStyleValue(values[0]);
            right = getBorderStyleValue(values[0]);
            bottom = getBorderStyleValue(values[0]);
            left = getBorderStyleValue(values[0]);
            break;
        case 2:
            top = getBorderStyleValue(values[0]);
            right = getBorderStyleValue(values[1]);
            bottom = getBorderStyleValue(values[0]);
            left = getBorderStyleValue(values[1]);
            break;
        case 3:
            top = getBorderStyleValue(values[0]);
            right = getBorderStyleValue(values[1]);
            bottom = getBorderStyleValue(values[2]);
            left = getBorderStyleValue(values[1]);
            break;
        case 4:
            top = getBorderStyleValue(values[0]);
            right = getBorderStyleValue(values[1]);
            bottom = getBorderStyleValue(values[2]);
            left = getBorderStyleValue(values[3]);
            break;
        default:
            top = right = bottom = left = {'type':valueType.Invalid, 'value':value};
        }
        return {'top': top, 'right': right, 'bottom': bottom, 'left': left};

        function getBorderStyleValue(v) {
            var style = isBorderStyleValue(v);
            return style?style:{'type':valueType.Invalid, 'value':v};
        }
    },
    'border-top-style': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-style
        var style = isBorderStyleValue(value.trim());
        return style?style:{'type': valueType.Invalid, 'value': value};
    },
    'border-right-style': function(value) {
        // the same as border-top-style
        return parser['border-top-style'](value);
    },
    'border-bottom-style': function(value) {
        // the same as border-top-style
        return parser['border-top-style'](value);
    },
    'border-left-style': function(value) {
        // the same as border-top-style
        return parser['border-top-style'](value);
    },
    'border-width': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-width
        var topValue, rightValue, bottomValue, leftValue, values;
        value = value.trim();
        values = value.split(/\s+/);
        switch(values.length) {
        case 1:
            topValue = getBorderWidthValue(values[0]);
            rightValue = getBorderWidthValue(values[0]);
            bottomValue = getBorderWidthValue(values[0]);
            leftValue = getBorderWidthValue(values[0]);
            break;
        case 2:
            topValue = getBorderWidthValue(values[0]);
            rightValue = getBorderWidthValue(values[1]);
            bottomValue = getBorderWidthValue(values[0]);
            leftValue = getBorderWidthValue(values[1]);
            break;
        case 3:
            topValue = getBorderWidthValue(values[0]);
            rightValue = getBorderWidthValue(values[1]);
            bottomValue = getBorderWidthValue(values[2]);
            leftValue = getBorderWidthValue(values[1]);
        case 4:
            topValue = getBorderWidthValue(values[0]);
            rightValue = getBorderWidthValue(values[1]);
            bottomValue = getBorderWidthValue(values[2]);
            leftValue = getBorderWidthValue(values[3]);
            break;
        default:
            topValue = leftValue = bottomValue = rightValue = {"type": valueType.Invalid, "value": value};
        }
        
        return {'top': topValue, 'right': rightValue, 'bottom': bottomValue, 'left': leftValue};
        
        function getBorderWidthValue(v) {
            var width = isBorderWidthValue(v);
            return width?width:{"type": valueType.Invalid, "value": v};
        }
    },
    'border-left-width': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-width
        var width = isBorderWidthValue(value.trim());
        return width?width:{"type": valueType.Invalid, "value": value};
    },
    'border-right-width': function(value) {
        // the same as border-left-width
        return parser['border-left-width'](value);
    },
    'border-top-width': function(value) {
        // the same as border-left-width
        return parser['border-left-width'](value);
    },
    'border-bottom-width': function(value) {
        // the same as border-left-width
        return parser['border-left-width'](value);
    },
    'border-radius': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-radius
        var topleft = [], topright = [], bottomright = [], bottomleft = [], errorOccured = false,
            horizontalValues, verticalValues, indexOfSlash;
        value = value.trim();
        indexOfSlash = value.indexOf('/');

        if (indexOfSlash != -1) {
            horizontalValues = value.substring(0, indexOfSlash).trim().split(/\s+/);
            verticalValues = value.substring(indexOfSlash + 1).trim().split(/\s+/);
        } else {
            horizontalValues = verticalValues = value.split(/\s+/);
        }

        [horizontalValues, verticalValues].forEach(function(values) {
            switch(values.length) {
            case 1:
                topleft.push(getBorderRadiusValue(values[0]));
                topright.push(getBorderRadiusValue(values[0]));
                bottomright.push(getBorderRadiusValue(values[0]));
                bottomleft.push(getBorderRadiusValue(values[0]));
                break;
            case 2:
                topleft.push(getBorderRadiusValue(values[0]));
                bottomright.push(getBorderRadiusValue(values[0]));
                topright.push(getBorderRadiusValue(values[1]));
                bottomleft.push(getBorderRadiusValue(values[1]));
                break;
            case 3:
                topleft.push(getBorderRadiusValue(values[0]));
                topright.push(getBorderRadiusValue(values[1]));
                bottomleft.push(getBorderRadiusValue(values[1]));
                bottomright.push(getBorderRadiusValue(values[2]));
                break;
            case 4:
                topleft.push(getBorderRadiusValue(values[0]));
                topright.push(getBorderRadiusValue(values[1]));
                bottomright.push(getBorderRadiusValue(values[2]));
                bottomleft.push(getBorderRadiusValue(values[3]));
                break;
            default:
                errorOccured = true;
            }
        });
        
        if (errorOccured) return {'type': valueType.Invalid, 'value': value};
        return {'topleft': topleft, 'topright': topright, 'bottomright': bottomright, 'bottomleft': bottomleft};

        function getBorderRadiusValue(v) {
            // Negative value is illegal.
            var radius = isBorderRadiusValue(v);
            return radius?radius:{'type': valueType.Invalid, 'value': v};
        }

    },
    'border-top-left-radius': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-radius
        var result = [], values;
        values = value.trim().split(/\s+/);
        switch(values.length) {
        case 1:
            result.push(getBorderRadiusValue(values[0]));
            result.push(getBorderRadiusValue(values[0]));
            break;
        case 2:
            result.push(getBorderRadiusValue(values[0]));
            result.push(getBorderRadiusValue(values[1]));
            break;
        default:
            result.push({'type': valueType.Invalid, 'value': value});
            result.push({'type': valueType.Invalid, 'value': value});
        }
        return result;

        function getBorderRadiusValue(v) {
            // Negative value is illegal.
            var radius = isBorderRadiusValue(v);
            return radius?radius:{'type': valueType.Invalid, 'value': v};
        }
    },
    'border-top-right-radius': function(value) {
        // the same as border-top-left-radius
        return parser['border-top-left-radius'](value);
    },
    'border-bottom-right-radius': function(value) {
        // the same as border-top-left-radius
        return parser['border-top-left-radius'](value);
    },
    'border-bottom-left-radius': function(value) {
        // the same as border-top-left-radius
        return parser['border-top-left-radius'](value);
    },
    'border-image': function(value) {

    },
    'border-image-source': function(value) {

    },
    'border-image-slice': function(value) {

    },
    'border-image-width': function(value) {

    },
    'border-image-outset': function(value) {

    },
    'border-image-repeat': function(value) {

    },
    'font': function(value) {
        // http://www.w3.org/TR/css3-fonts/#propdef-font
        var styleRegExp, weightRegExp, variantRegExp, sizeKeywordRegExp, lengthRegExp, cellRegExp,
            keywords, result, tmpValue, matchResult, status;

        value = value.trim();
        keywords =['caption', 'icon', 'menu', 'message-box', 'small-caption', 'status-bar'];
        if  (keywords.indexOf(value.toLowerCase()) != -1) {
            return {'type': valueType.FontKeyword, 'value': value};
        } else if (value.toLowerCase() == 'inherit') {
            return {'type': valueType.Inherit, 'value': value};
        }

        styleRegExp = /^(normal|italic|oblique)\s+/i;
        weightRegExp = /^(normal|bold|100|200|300|400|500|600|700|800|900)\s+/i;
        variantRegExp = /^(normal|small-caps)\s+/i;
        sizeKeywordRegExp = /^(xx-small|x-small|small|medium|large|x-large|xx-large|larger|smaller)/i;
        lengthRegExp = /^([+-]?[0-9]+|[+-]?[0-9]*\.[0-9]+)(cm|mm|in|pt|pc|px|em|ex|ch|rem|vw|vh|vmin|%)/i;
        lengthWithSpaceRegExp = /^(([+-]?[0-9]+|[+-]?[0-9]*\.[0-9]+)(cm|mm|in|pt|pc|px|em|ex|ch|rem|vw|vh|vmin|%))\s+/i;

        tmpValue = value;
        result = {};
        status = 'start'; // statues: 'start' 'style' 'variant' 'weight' 'size' 'lineHeight' 'family'
        while(tmpValue) {
            switch(status) {
            case 'start':
                matchResult = tmpValue.match(styleRegExp);
                if (matchResult) {
                    result.style = {'type': valueType.FontStyleKeyword, 'value': matchResult[1]};
                    status = 'style';
                } else {
                    matchResult = tmpValue.match(variantRegExp);
                    if (matchResult) {
                        result.variant = {'type': valueType.FontVariantKeyword, 'value': matchResult[1]};
                        status = 'variant';
                    } else {
                        matchResult = tmpValue.match(weightRegExp);
                        if (matchResult) {
                            result.weight = {'type': valueType.FontWeightKeyword, 'value': matchResult[1]};
                            status = 'weight';
                        } else {
                            matchResult = tmpValue.match(sizeKeywordRegExp) || tmpValue.match(lengthRegExp);
                            if (matchResult) {
                                if (relLengthRegExp.test(matchResult[0])) {
                                    result.size = {'type': valueType.RelativeLength, 'value': matchResult[0]};
                                } else if (absLengthRegExp.test(matchResult[0])) {
                                    result.size = {'type': valueType.AbsoluteLength, 'value': matchResult[0]};
                                } else {
                                    result.size = {'type': valueType.FontSizeKeyword, 'value': matchResult[0]};
                                }
                                status = 'size';
                            } else {
                                return {'type': valueType.Invalid, 'value': value};
                            }
                        }
                    }
                }
                tmpValue = tmpValue.substring(matchResult[0].length);
                break;
            case 'style':
                matchResult = tmpValue.match(variantRegExp);
                if (matchResult) {
                    result.variant = {'type': valueType.FontVariantKeyword, 'value': matchResult[1]};
                    status = 'variant';
                } else {
                    matchResult = tmpValue.match(weightRegExp);
                    if (matchResult) {
                        result.weight = {'type': valueType.FontWeightKeyword, 'value': matchResult[1]};
                        status = 'weight';
                    } else {
                        matchResult = tmpValue.match(sizeKeywordRegExp) || tmpValue.match(lengthRegExp);
                        if (matchResult) {
                            if (relLengthRegExp.test(matchResult[0])) {
                                result.size = {'type': valueType.RelativeLength, 'value': matchResult[0]};
                            } else if (absLengthRegExp.test(matchResult[0])) {
                                result.size = {'type': valueType.AbsoluteLength, 'value': matchResult[0]};
                            } else {
                                result.size = {'type': valueType.FontSizeKeyword, 'value': matchResult[0]};
                            }
                            status = 'size';
                        } else {
                            return {'type': valueType.Invalid, 'value': value};
                        }
                    }
                }
                tmpValue = tmpValue.substring(matchResult[0].length);
                break;
            case 'variant':
                matchResult = tmpValue.match(weightRegExp);
                if (matchResult) {
                    result.weight = {'type': valueType.FontWeightKeyword, 'value': matchResult[1]};
                    status = 'weight';
                } else {
                    matchResult = tmpValue.match(sizeKeywordRegExp) || tmpValue.match(lengthRegExp);
                    if (matchResult) {
                        if (relLengthRegExp.test(matchResult[0])) {
                            result.size = {'type': valueType.RelativeLength, 'value': matchResult[0]};
                        } else if (absLengthRegExp.test(matchResult[0])) {
                            result.size = {'type': valueType.AbsoluteLength, 'value': matchResult[0]};
                        } else {
                            result.size = {'type': valueType.FontSizeKeyword, 'value': matchResult[0]};
                        }
                        status = 'size';
                    } else {
                        return {'type': valueType.Invalid, 'value': value};
                    }
                }
                tmpValue = tmpValue.substring(matchResult[0].length);
                break;
            case 'weight':
                matchResult = tmpValue.match(sizeKeywordRegExp) || tmpValue.match(lengthRegExp);
                if (matchResult) {
                    if (relLengthRegExp.test(matchResult[0])) {
                        result.size = {'type': valueType.RelativeLength, 'value': matchResult[0]};
                    } else if (absLengthRegExp.test(matchResult[0])) {
                        result.size = {'type': valueType.AbsoluteLength, 'value': matchResult[0]};
                    } else {
                        result.size = {'type': valueType.FontSizeKeyword, 'value': matchResult[0]};
                    }
                    status = 'size';
                } else {
                    return {'type': valueType.Invalid, 'value': value};
                }
                tmpValue = tmpValue.substring(matchResult[0].length);
                break;
            case 'size':
                if (tmpValue.charAt(0) == ' ') {
                    tmpValue = tmpValue.replace(/^\s+/, '');
                    if (tmpValue.charAt(0) == '/') {
                        tmpValue = tmpValue.replace(/^\/\s*/, '');
                        status = 'lineHeight';
                    } else {
                        status = 'family';
                    }
                } else if (tmpValue.charAt(0) == '/') {
                    tmpValue = tmpValue.replace(/^\/\s*/, '');
                    status = 'lineHeight';
                } else {
                    return {'type': valueType.Invalid, 'value': value};
                }
                break;
            case 'lineHeight':
                // lineHeight can be normal | <number> | <length>  | <percentage>
                matchResult = tmpValue.match(/^(normal)\s+/i);
                if (matchResult) {
                    result.lineHeight = {'type': valueType.LineHeightKeyword, 'value': matchResult[1]};
                } else {
                    matchResult = tmpValue.match(/^([+-]?[0-9]+|[+-]?[0-9]*\.[0-9]+)\s+/);
                    if (matchResult) {
                        result.lineHeight = {'type': valueType.Number, 'value': matchResult[1]};
                    } else {
                        matchResult = tmpValue.match(lengthWithSpaceRegExp);
                        if (matchResult) {
                            if (relLengthRegExp.test(matchResult[1])) {
                                result.lineHeight = {'type': valueType.RelativeLength, 'value': matchResult[1]};
                            } else {
                                result.lineHeight = {'type': valueType.AbsoluteLength, 'value': matchResult[1]};
                            }
                        } else {
                            return {'type': valueType.Invalid, 'value': value};
                        }
                    }
                }
                status = 'family';
                tmpValue = tmpValue.substring(matchResult[0].length);
                break;
            case 'family':
                result.family = {'type': valueType.FontFamily, 'value': tmpValue};
                tmpValue = '';
                break;
            default:
                // should never come into here
                return {'type': valueType.Invalid, 'value': value};
            }
        }
        if (result.size && result.family) {
            return result;
        }
        return {'type': valueType.Invalid, 'value': value};
    },
    'font-size': function(value) {
        // http://www.w3.org/TR/css3-fonts/#font-size-prop
        var absoluteKeywords = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'],
            relativeKeywords = ['larger', 'smaller'];
        value = value.trim();
        if (value.toLowerCase() == 'inherit') {
            return {'type': valueType.Inherit, 'value': value};
        } else if (absoluteKeywords.indexOf(value.toLowerCase()) != -1 ||
                   relativeKeywords.indexOf(value.toLowerCase()) != -1) {
            return {'type': valueType.FontSizeKeyword, 'value': value};
        } else if (relLengthRegExp.test(value)) {
            return {'type': valueType.RelativeLength, 'value': value};
        } else if (absLengthRegExp.test(value)) {
            return {'type': valueType.AbsoluteLength, 'value': value};
        }
        return {'type': valueType.Invalid, 'value': value};
    },
    'font-family': function(value) {
        // http://www.w3.org/TR/css3-fonts/#propdef-font-family
        var regExp, values, tmpValue, matchResult;

        if (value.trim().toLowerCase() == 'inherit') {
            return {'type': valueType.Inherit, 'value': value};
        }

        regExp = /^([^"',]+|".+?"|'.+?'),\s*/;
        tmpValue = value.trim() + ',';
        values = [];
        while(tmpValue) {
            matchResult = tmpValue.match(colorRegExp);
            if (matchResult) {
                values.push(matchResult[1]);
                tmpValue = tmpValue.substring(matchResult[0].length);
            } else {
                return {'type': valueType.Invalid, 'value': value};
            }
        }
        return {'type': valueType.FontFamily, 'value': values};
    },
    'font-style': function(value) {
        // http://www.w3.org/TR/css3-fonts/#propdef-font-style
        var keywords = ['normal', 'italic', 'oblique'];
        value = value.trim();
        if (keywords.indexOf(value.toLowerCase()) != -1) {
            return {'type': valueType.FontStyleKeyword, 'value': value};
        } else if (value.toLowerCase() == 'inherit') {
            return {'type': valueType.Inherit, 'value': value};
        }
        return {'type': valueType.Invalid, 'value': value};
    },
    'font-weight': function(value) {
        // http://www.w3.org/TR/css3-fonts/#propdef-font-weight
        var keywords = ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
        value = value.trim();
        if (keywords.indexOf(value.toLowerCase()) != -1) {
            return {'type': valueType.FontWeightKeyword, 'value': value};
        } else if (value.toLowerCase() == 'inherit') {
            return {'type': valueType.Inherit, 'value': value};
        }
        return {'type': valueType.Invalid, 'value': value};
    },
    'font-stretch': function(value) {
        // http://www.w3.org/TR/css3-fonts/#propdef-font-stretch
        var keywords = ['normal', 'ultra-condensed', 'extra-condensed', 'condensed', 'semi-condensed', 'semi-expanded', 'expanded', 'extra-expanded', 'ultra-expanded'];
        value = value.trim();
        if (keywords.indexOf(value.toLowerCase()) != -1) {
            return {'type': valueType.FontStretchKeyword, 'value': value};
        } else if (value.toLowerCase() == 'inherit') {
            return {'type': valueType.Inherit, 'value': value};
        }
        return {'type': valueType.Invalid, 'value': value};
    },
    'font-size-adjust': function(value) {
        // http://www.w3.org/TR/css3-fonts/#propdef-font-size-adjust
        value = value.trim();
        if (value.toLowerCase() == 'inherit') {
            return {'type': valueType.Inherit, 'value': value};
        } else if (value.toLowerCase() == 'none') {
            return {'type': valueType.None, 'value': value};
        } else if (numRegExp.test(value)) {
            return {'type': valueType.Number, 'value': value};
        }
        return {'type': valueType.Invalid, 'value': value};
    },
    'font-synthesis': function(value) {
        // http://www.w3.org/TR/css3-fonts/#propdef-font-synthesis
        value =value.trim();
        if (value.toLowerCase() == 'none') {
            return {'type': valueType.None, 'value': value};
        } else if (value.toLowerCase() == 'weight') {
            return {'weight': {'type':valueType.FontSynthesisKeyword, 'value': value}};
        } else if (value.toLowerCase() == 'style') {
            return {'style': {'type':valueType.FontSynthesisKeyword, 'value': value}};
        } else if (/^weight\s+style$|^style\s+weight$/i.test(value)) {
            return {'weight': {'type':valueType.FontSynthesisKeyword, 'value': value},
                    'style': {'type':valueType.FontSynthesisKeyword, 'value': value}};
        }
        return {'type': valueType.Invalid, 'value': value};
    },
    'background': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#background
        var startPointer, searchPointer, length, character, token, tokenList,result, layerData, tmpValue;

        value = value.trim() + ' ';
        startPointer = 0;
        searchPointer = 0;
        length = value.length;
        tokenList = [];
        while(startPointer < length) {
            while(/\s/.test(value.charAt(startPointer))) startPointer++;
            if (startPointer >= length) break;
            searchPointer = startPointer;
            if (tryBackgroundImage()) continue;
            if (tryBackgroundPositionAndSize()) continue;
            if (tryBackgroundRepeat()) continue;
            if (tryBackgroundAttachment()) continue;
            if (tryBackgroundBox()) continue;
            if (tryBackgroundColor()) continue;
            if (tryComma()) continue;
            return {'type': valueType.Invalid, 'value': value.trim()};
        }

        result = [];
        layerData = {};
        length = tokenList.length;
        if (length > 0) {
            if (tokenList[0] == ',' || tokenList[length - 1] == ',') {
                return {'type': valueType.Invalid, 'value': value.trim()};
            }
            tokenList.push(',');
            length++;
        }
        for (var i = 0; i < length; i++) {
            if (tokenList[i] == ',') {
                result.push(layerData);
                layerData = {};
            } else {
                if (layerData[tokenList[i][0]]) {
                    // value repeated
                    return {'type': valueType.Invalid, 'value': value.trim()};
                }
                switch(tokenList[i][0]) {
                case 'image':
                    tmpValue = isBackgroundImageValue(tokenList[i][1]);
                    if (!tmpValue) {
                        return {'type': valueType.Invalid, 'value': value.trim()};
                    }
                    layerData['background-image'] = tmpValue;
                    break;
                case 'position':
                    tmpValue = parser['background-position'](tokenList[i][1]);
                    if (tmpValue && tmpValue.type != valueType.Invalid) {
                        layerData['background-position'] = tmpValue[0];
                    } else {
                        return {'type': valueType.Invalid, 'value': value.trim()};
                    }
                    break;
                case 'size':
                    tmpValue = parser['background-size'](tokenList[i][1]);
                    if (tmpValue && tmpValue.type != valueType.Invalid) {
                        layerData['background-size'] = tmpValue[0];
                    } else {
                        return {'type': valueType.Invalid, 'value': value.trim()};
                    }
                    break;
                case 'repeat':
                    layerData['background-repeat'] = {'type': valueType.BackgroundRepeatKeyword, 'value': tokenList[i][1]};
                    break;
                case 'attachment':
                    layerData['background-attachment'] = {'type': valueType.BackgroundAttachmentKeyword, 'value': tokenList[i][1]};
                    break;
                case 'box':
                    tmpValue = tokenList[i][1].split(/\s+/);
                    switch(tmpValue.length) {
                    case 1:
                        layerData['background-origin'] = isBackgroundBoxValue(tmpValue[0]);
                        layerData['background-clip'] = isBackgroundBoxValue(tmpValue[0]);
                        break;
                    case 2:
                        layerData['background-origin'] = isBackgroundBoxValue(tmpValue[0]);
                        layerData['background-clip'] = isBackgroundBoxValue(tmpValue[1]);
                        break;
                    default:
                        return {'type': valueType.Invalid, 'value': value.trim()};
                    }
                    break;
                case 'color':
                    layerData['background-color'] = isColorValue(tokenList[i][1]);
                    break;
                default:
                    // should never come into here
                    return {'type': valueType.Invalid, 'value': value.trim()};
                }
            }
        }

        length = result.length;
        for (var i = 0; i < length; i++) {
            if (result[i].color && (i != length - 1)) {
                return {'type': valueType.Invalid, 'value': value.trim()};
            }
        }

        return result;
        
        function tryBackgroundImage() {
            var urlPrefixRegExp = /^url\(/i, imagePrefixRegExp = /^image\(/i,
                gradientPrefixRegExp, subValue, brackets, prevChar, result;

            gradientPrefixRegExp = [];
            ['^', '^-o-', '^-ms-', '^-moz-', '^-webkit-'].forEach(function(prefix) {
                ['linear-gradient\\(', 'radial-gradient\\(', 'repeating-linear-gradient\\(', 'repeating-radial-gradient\\('].forEach(function(gradient) {
                    gradientPrefixRegExp.push(prefix + gradient);
                });
            });
            gradientPrefixRegExp = new RegExp(gradientPrefixRegExp.join('|'), 'i');

            subValue = value.substring(startPointer);
            brackets = 0;
            if (urlPrefixRegExp.test(subValue) ||
                imagePrefixRegExp.test(subValue) ||
                gradientPrefixRegExp.test(subValue)) {
                while(searchPointer < length) {
                    character = value.charAt(searchPointer);
                    if (character == '(') {
                        prevChar = value.charAt(searchPointer - 1);
                        if (prevChar != '\\') {
                            brackets++;
                        }
                    } else if (character == ')') {
                        prevChar = value.charAt(searchPointer - 1);
                        if (prevChar != '\\') {
                            brackets--;
                            if (brackets == 0) {
                                if (/[\s,]/.test(value.charAt(searchPointer + 1))) {
                                    // success to get a background image value
                                    searchPointer++;
                                    result = value.substring(startPointer, searchPointer);
                                    startPointer = searchPointer;
                                    tokenList.push(['image', result]);
                                    return true;
                                } else {
                                    // not a background image value
                                    searchPointer = startPointer;
                                    return false;
                                }
                            }
                        }
                    }
                    searchPointer++;
                }
                // not a background image value
                searchPointer = startPointer;
                return false;
            } else if (/^none/i.test(subValue)) {
                searchPointer += 4;
                character = value.charAt(searchPointer);
                if (/[\s,]/.test(character)) {
                    // success to get a background image value 'none'
                    result = value.substring(startPointer, searchPointer);
                    startPointer = searchPointer;
                    tokenList.push(['image', result]);
                    return true;
                } else {
                    // not a background image value
                    searchPointer = startPointer;
                    return false;
                }
            }
            return false;
        }

        function tryBackgroundPositionAndSize() {
            var posKeywordRegExp = /^(left|center|right|top|bottom)$/i,
                sizeKeywordRegExp = /^(auto|cover|contain)$/i,
                lengthRegExp = /^([+-]?[0-9]+|[+-]?[0-9]*\.[0-9]+)(cm|mm|in|pt|pc|px|em|ex|ch|rem|vw|vh|vmin|%)?$/i,
                status, buffer, posArray, sizeArray, propertyStartPointer;

            status = 'position'; // statuses: 'position' 'size'
            posArray = []; sizeArray = [];
            propertyStartPointer = startPointer;
            while(searchPointer < length) {
                character = value.charAt(searchPointer);
                if (character == '/') {
                    if (status == 'size') {
                        searchPointer = startPointer;
                        return false;
                    }
                    buffer = value.substring(propertyStartPointer, searchPointer).trim();
                    if (posKeywordRegExp.test(buffer) || lengthRegExp.test(buffer)) {
                        posArray.push(buffer);
                        status = 'size';
                    } else if (!buffer) {
                        if (posArray.length > 0) {
                            status = 'size';
                        } else {
                            searchPointer = startPointer;
                            return false;
                        }
                    } else {
                        searchPointer = startPointer;
                        return false;
                    }
                    propertyStartPointer = searchPointer + 1;
                } else if (/\s/.test(character)) {
                    buffer = value.substring(propertyStartPointer, searchPointer).trim();
                    if (!buffer) {
                        searchPointer++;
                        continue;
                    }
                    if (status == 'position') {
                        if (posKeywordRegExp.test(buffer) || lengthRegExp.test(buffer)) {
                            posArray.push(buffer);
                        } else {
                            break;
                        }
                    } else {
                        if (sizeKeywordRegExp.test(buffer) || lengthRegExp.test(buffer)) {
                            sizeArray.push(buffer);
                        } else {
                            break;
                        }
                    }
                    propertyStartPointer = searchPointer + 1;
                } else if (/,/.test(character)) {
                    buffer = value.substring(propertyStartPointer, searchPointer).trim();
                    if (!buffer) {
                        break;
                    }
                    if (status = 'position') {
                        if (posKeywordRegExp.test(buffer) || lengthRegExp.test(buffer)) {
                            posArray.push(buffer);
                            propertyStartPointer = searchPointer;
                        }
                    } else {
                        if (sizeKeywordRegExp.test(buffer) || lengthRegExp.test(buffer)) {
                            sizeArray.push(buffer);
                            propertyStartPointer = searchPointer;
                        }
                    }
                    break;
                }
                searchPointer++;
            }

            if (sizeArray.length == 0 && posArray.length == 0) {
                searchPointer = startPointer;
                return false;
            } else {
                if (posArray.length > 0) {
                    tokenList.push(['position', posArray.join(' ')]);
                }
                if (sizeArray.length > 0) {
                    tokenList.push(['size', sizeArray.join(' ')]);
                }
                startPointer = searchPointer = propertyStartPointer;
                return true;
            }
        }

        function tryBackgroundRepeat() {
            var keywordRegExp = /^(repeat-x|repeat-y|repeat|space|round|no-repeat)$/i,
                buffer, valueArray, propertyStartPointer;

            valueArray = [];
            propertyStartPointer = startPointer;
            while(searchPointer < length) {
                character = value.charAt(searchPointer);
                if (/[\s,]/.test(character)) {
                    buffer = value.substring(propertyStartPointer, searchPointer).trim();
                    if (keywordRegExp.test(buffer)) {
                        valueArray.push(buffer);
                        propertyStartPointer = searchPointer;
                        if (character == ',' || valueArray.length >= 2) {
                            break;
                        }
                    } else if (buffer) {
                        break;
                    }
                }
                searchPointer++;
            }

            if (valueArray.length == 0) {
                searchPointer = startPointer;
                return false;
            } else {
                tokenList.push(['repeat', valueArray.join(' ')]);
                startPointer = searchPointer = propertyStartPointer;
                return true;
            }
        }

        function tryBackgroundAttachment() {
            var keywordRegExp = /^(scroll|fixed|local)$/i,
                buffer;

            while(searchPointer < length) {
                character = value.charAt(searchPointer);
                if (/[\s,]/.test(character)) {
                    buffer = value.substring(startPointer, searchPointer).trim();
                    if (keywordRegExp.test(buffer)) {
                        break;
                    } else if (buffer) {
                        buffer = '';
                        break;
                    }
                }
                searchPointer++;
            }

            if (buffer) {
                tokenList.push(['attachment', buffer]);
                startPointer = searchPointer;
                return true;
            } else {
                searchPointer = startPointer;
                return false;
            }
        }

        function tryBackgroundBox() {
            var keywordRegExp = /^(border-box|padding-box|content-box)$/i,
                buffer, valueArray, propertyStartPointer;

            valueArray = [];
            propertyStartPointer = startPointer;
            while(searchPointer < length) {
                character = value.charAt(searchPointer);
                if (/[\s,]/.test(character)) {
                    buffer = value.substring(propertyStartPointer, searchPointer).trim();
                    if (keywordRegExp.test(buffer)) {
                        valueArray.push(buffer);
                        propertyStartPointer = searchPointer;
                        if (character == ',' || valueArray.length >= 2) {
                            break;
                        }
                    } else if (buffer) {
                        break;
                    }
                }
                searchPointer++;
            }

            if (valueArray.length == 0) {
                searchPointer = startPointer;
                return false;
            } else {
                tokenList.push(['box', valueArray.join(' ')]);
                startPointer = searchPointer = propertyStartPointer;
                return true;
            }
        }

        function tryBackgroundColor() {
            var colorValue, matchResult, subValue, regExp;

            regExp = /^(\w+\(.*?\)|[^,\s]+)(\s+|,)/;
            subValue = value.substring(startPointer);
            matchResult = subValue.match(regExp);
            if (matchResult) {
                colorValue = isColorValue(matchResult[1]);
                if (colorValue && colorValue.type != valueType.Inherit) {
                    tokenList.push(['color', colorValue.value]);
                    startPointer = startPointer + matchResult[1].length;
                    searchPointer = startPointer;
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        function tryComma() {
            if (value.charAt(searchPointer) == ',' && tokenList[tokenList.length - 1] != ',') {
                tokenList.push(',');
                startPointer = ++searchPointer;
                return true;
            }
            return false;
        }
    },
    'background-image': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#ltbg-imagegt
        var urlPrefixRegExp = /^url\(/i, imagePrefixRegExp = /^image\(/i,
            gradientPrefixRegExp, startPointer, searchPointer, brackets, length, tmpValue, character, found, result;

        gradientPrefixRegExp = [];
        ['^', '^-o-', '^-ms-', '^-moz-', '^-webkit-'].forEach(function(prefix) {
            ['linear-gradient\\(', 'radial-gradient\\(', 'repeating-linear-gradient\\(', 'repeating-radial-gradient\\('].forEach(function(gradient) {
                gradientPrefixRegExp.push(prefix + gradient);
            });
        });
        gradientPrefixRegExp = new RegExp(gradientPrefixRegExp.join('|'), 'i');

        value = value.trim();
        if (value.charAt(0) == ',' || value.charAt(value.length - 1) == ',') {
            return {'type': valueType.Invalid, 'value': value};
        }
        value += ' ';

        startPointer = searchPointer = 0;
        brackets = 0;
        length = value.length;
        result = [];
        while(startPointer < length) {
            while(/\s/.test(value.charAt(startPointer))) startPointer++;
            if (startPointer >= length) break;
            searchPointer = startPointer;

            tmpValue = value.substring(startPointer);
            if (urlPrefixRegExp.test(tmpValue) ||
                imagePrefixRegExp.test(tmpValue) ||
                gradientPrefixRegExp.test(tmpValue)) {

                found = false;
                while(searchPointer < length) {
                    character = value.charAt(searchPointer);
                    if (character == '(') {
                        if (value.charAt(searchPointer - 1) != '\\') {
                            brackets++;
                        }
                    } else if (character == ')' && --brackets == 0 &&
                               value.charAt(searchPointer - 1) != '\\' &&
                               /[\s,]/.test(value.charAt(searchPointer + 1))) {
                        // success to get a background image value
                        if (result.length > 0 && result[result.length - 1] != ',') {
                            // no more than one image for one layer
                            return {'type': valueType.Invalid, 'value': value};
                        }
                        searchPointer++;
                        result.push(value.substring(startPointer, searchPointer));
                        startPointer = searchPointer;
                        found = true;
                        break;
                    }
                    searchPointer++;
                }

                if (!found) {
                    return {'type': valueType.Invalid, 'value': value};
                }
                continue;
            } else if (/^none|^inherit/i.test(tmpValue)) {
                searchPointer = /^none/i.test(tmpValue) ? searchPointer + 4 : searchPointer + 7;
                character = value.charAt(searchPointer);
                if (/[\s,]/.test(character)) {
                    // success to get a background image value 'none' or 'inherit'
                    if (result.length > 0 && result[result.length - 1] != ',') {
                        // no more than one image for one layer
                        return {'type': valueType.Invalid, 'value': value};
                    }
                    result.push(value.substring(startPointer, searchPointer));
                    startPointer = searchPointer;
                    continue;
                } else {
                    // not a background image value
                    return {'type': valueType.Invalid, 'value': value};
                }
            } else if (value.charAt(startPointer) == ',') {
                if (result[result.length - 1] == ',') {
                    return {'type': valueType.Invalid, 'value': value};
                }
                result.push(',');
                searchPointer = ++startPointer;
            } else {
                return {'type': valueType.Invalid, 'value': value};
            }
        }

        // get rid of ','
        var index = result.indexOf(',');
        while(index != -1) {
            result.splice(index, 1);
            index = result.indexOf(',');
        }

        result = result.map(function(image) {
            return isBackgroundImageValue(image);
        });
        return result;
    },
    'background-color': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-background-color
        var color = isColorValue(value.trim());
        return color?color:{'type': valueType.Invalid, 'value': value};
    },
    'background-repeat': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#ltrepeat-stylegt
        var result = [], values, repeat;
        values = value.trim().split(',');
        for (var i = 0, length = values.length; i < length; i++) {
            repeat = isBackgroundRepeatValue(values[i].trim());
            if (!repeat) {
                return {'type': valueType.Invalid, 'value': value};
            }
            result.push(repeat);
        }
        return result;
    },
    'background-attachment': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#ltattachmentgt
        var result = [], values, attachment;
        values = value.trim().split(',');
        for (var i = 0, length = values.length; i < length; i++) {
            attachment = isBackgroundAttachmentValue(values[i].trim());
            if (!attachment) {
                return {'type': valueType.Invalid, 'value': value};
            }
            result.push(attachment);
        }
        return result;
    },
    'background-origin': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-background-origin
        var result = [], values, origin;
        values = value.trim().split(',');
        for (var i = 0, length = values.length; i < length; i++) {
            origin = isBackgroundBoxValue(values[i].trim());
            if (!origin) {
                return {'type': valueType.Invalid, 'value': value};
            }
            result.push(origin);
        }
        return result;
    },
    'background-clip': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-background-clip
        var result = [], values, clip;
        values = value.trim().split(',');
        for (var i = 0, length = values.length; i < length; i++) {
            clip = isBackgroundBoxValue(values[i].trim());
            if (!clip) {
                return {'type': valueType.Invalid, 'value': value};
            }
            result.push(clip);
        }
        return result;
    },
    'background-size': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-background-size
        var values = value.split(','), sizes, size, result, width, height;
        result = [];
        for (var i = 0, length = values.length; i < length; i++) {
            sizes = values[i].trim().split(/\s+/);
            switch(sizes.length) {
            case 1:
                size = isBackgroundSizeValue(sizes[0]);
                if (size) {
                    if (size.type == valueType.BackgroundSizeKeyword || size.type == valueType.Inherit) {
                        result.push(size);
                    } else {
                        result.push({'width': size, 'height': {'type': valueType.Auto, value: 'auto'}});
                    }
                } else {
                    return {'type': valueType.Invalid, 'value': value};
                }
                break;
            case 2:
                width = isBackgroundSizeValue(sizes[0]);
                if (width && width.type != valueType.Inherit && width.type != valueType.BackgroundSizeKeyword) {
                    height = isBackgroundSizeValue(sizes[1]);
                    if (height && height.type != valueType.Inherit && height.type != valueType.BackgroundSizeKeyword) {
                        result.push({'width': width, 'height': height});
                    } else {
                        return {'type': valueType.Invalid, 'value': value};
                    }
                } else {
                    return {'type': valueType.Invalid, 'value': value};
                }
                break;
            default:
                // error
                return {'type': valueType.Invalid, 'value': value};
            }
        }
        if (result.length == 0) {
            return {'type': valueType.Invalid, 'value': value};
        }
        return result;
    },
    'background-position': function(value) {
        var values = value.split(','), positions, result, tmpValue, horizontal, vertical;
        result = [];
        for (var i = 0, length = values.length; i < length; i++) {
            positions = values[i].trim().split(/\s+/);
            switch(positions.length) {
            case 1:
                tmpValue = isBackgroundPositionValue(positions[0]);
                if (tmpValue) {
                    if (tmpValue.type == valueType.Inherit) {
                        result.push(tmpValue);
                    } else if (tmpValue.value == 'top' || tmpValue.value == 'bottom') {
                        result.push({'horizontal': 'center', 'vertical': tmpValue.value});
                    } else {
                        result.push({'horizontal': tmpValue.value, 'vertical': 'center'});
                    }
                } else {
                    return {'type': valueType.Invalid, 'value': value};
                }
                break;
            case 2:
                tmpValue = isBackgroundPositionValue(positions[0]);
                if (tmpValue && tmpValue.type != valueType.Inherit) {
                    if (tmpValue.value == 'center') {
                        tmpValue = isBackgroundPositionValue(positions[1]);
                        if (tmpValue && tmpValue.type != valueType.Inherit) {
                            if (tmpValue.value == 'left' || tmpValue.value == 'right') {
                                result.push({'horizontal': tmpValue.value, 'vertical': 'center'});
                            } else {
                                result.push({'horizontal': 'center', 'vertical': tmpValue.value});
                            }
                        } else {
                            return {'type': valueType.Invalid, 'value': value};
                        }
                    } else if (tmpValue.value == 'left' || tmpValue.value == 'right') {
                        horizontal = tmpValue.value;
                        tmpValue = isBackgroundPositionValue(positions[1]);
                        if (tmpValue && tmpValue.type != valueType.Inherit) {
                            if (tmpValue.type == valueType.BackgroundPositionKeyword &&
                                (tmpValue.value == 'left' || tmpValue.value == 'right')) {
                                return {'type': valueType.Invalid, 'value': value}
                            } else {
                                result.push({'horizontal': horizontal, 'vertical': tmpValue.value});
                            }
                        } else {
                            return {'type': valueType.Invalid, 'value': value};
                        }
                    } else if (tmpValue.value == 'top' || tmpValue.value == 'bottom') {
                        vertical = tmpValue.value;
                        tmpValue = isBackgroundPositionValue(positions[1]);
                        if (tmpValue && tmpValue.type == valueType.BackgroundPositionKeyword &&
                            (tmpValue.value == 'left' || tmpValue.value == 'right' || tmpValue.value == 'center')) {
                            result.push({'horizontal': tmpValue.value, 'vertical': vertical});
                        } else {
                            return {'type': valueType.Invalid, 'value': value};
                        }
                    } else {
                        horizontal = tmpValue.value;
                        tmpValue = isBackgroundPositionValue(positions[1]);
                        if (tmpValue && tmpValue.type != valueType.Inherit &&
                            tmpValue.value != 'left' && tmpValue.value != 'right') {
                            result.push({'horizontal': horizontal, 'vertical': tmpValue.value});
                        } else {
                            return {'type': valueType.Invalid, 'value': value};
                        }
                    }
                } else {
                    return {'type': valueType.Invalid, 'value': value};
                }
                break;
            case 3:
                tmpValue = isBackgroundPositionValue(positions[0]);
                // the first value must be a keyword
                if (tmpValue && tmpValue.type == valueType.BackgroundPositionKeyword) {
                    if (tmpValue == 'center') { // first value is 'center'
                        tmpValue = isBackgroundPositionValue(positions[1]);
                        // second value must be a keyword and its value must NOT be 'center'
                        if (tmpValue &&
                            tmpValue.type == valueType.BackgroundPositionKeyword &&
                            tmpValue.value != 'center') {
                            if (tmpValue.value == 'left' || tmpValue.value == 'right') {
                                // second value is 'left' or 'right'
                                horizontal = tmpValue.value;
                                tmpValue = isBackgroundPositionValue(positions[2]);
                                // third value must be a length
                                if (tmpValue &&
                                    tmpValue.type != valueType.Inherit &&
                                    tmpValue.type != valueType.BackgroundPositionKeyword) {
                                    horizontal += ' ' + tmpValue.value;
                                    result.push({'horizontal': horizontal, 'vertical': 'center'});
                                } else {
                                    return {'type': valueType.Invalid, 'value': value};
                                }
                            } else {
                                // second value is 'top' or 'bottom'
                                vertical = tmpValue.value;
                                tmpValue = isBackgroundPositionValue(positions[2]);
                                // third value must be a length
                                if (tmpValue &&
                                    tmpValue.type != valueType.Inherit &&
                                    tmpValue.type != valueType.BackgroundPositionKeyword) {
                                    vertical += ' ' + tmpValue.value;
                                    result.push({'horizontal': 'center', 'vertical': vertical});
                                } else {
                                    return {'type': valueType.Invalid, 'value': value};
                                }
                            }
                        } else {
                            return {'type': valueType.Invalid, 'value': value};
                        }
                    } else if (tmpValue.value == 'top' || tmpValue.value == 'bottom') {
                        // first value is 'top' or 'bottom'
                        vertical = tmpValue.value;
                        tmpValue = isBackgroundPositionValue(positions[1]);
                        if (tmpValue && tmpValue.type != valueType.Inherit) {
                            if (tmpValue.type == valueType.BackgroundPositionKeyword) {
                                // second value is also keyword but it must NOT be 'center', 'bottom' or 'top'
                                if (tmpValue.value == 'top' || tmpValue.value == 'bottom' || tmpValue.value == 'center') {
                                    return {'type': valueType.Invalid, 'value': value};
                                } else {
                                    horizontal = tmpValue.value;
                                    tmpValue = isBackgroundPositionValue(positions[2]);
                                    // third value must be a length
                                    if (tmpValue && tmpValue.type != valueType.Inherit &&
                                        tmpValue.valueType != valueType.BackgroundPositionKeyword) {
                                        horizontal += ' ' + tmpValue.value;
                                        result.push({'horizontal': horizontal, 'vertical': vertical});
                                    } else {
                                        return {'type': valueType.Invalid, 'value': value};
                                    }
                                }
                            } else {
                                // second value is a length
                                vertical += ' ' + tmpValue.value;
                                tmpValue = isBackgroundPositionValue(positions[2]);
                                // third value must be keyword and it must be 'center', 'left' or 'right'
                                if (tmpValue && tmpValue.type == valueType.BackgroundPositionKeyword &&
                                    (tmpValue.value == 'center'||tmpValue.value=='left'||tmpValue.value=='right')) {
                                    result.push({'horizontal': tmpValue.value, 'vertical': vertical});
                                } else {
                                    return {'type': valueType.Invalid, 'value': value};
                                }
                            }
                        } else {
                            return {'type': valueType.Invalid, 'value': value};
                        }
                    } else {
                        // first value is 'left' or 'right'
                        horizontal = tmpValue.value;
                        tmpValue = isBackgroundPositionValue(positions[1]);
                        if (tmpValue && tmpValue.type != valueType.Inherit) {
                            if (tmpValue.type == valueType.BackgroundPositionKeyword) {
                                // second value is also keyword but it must NOT be 'center', 'right' or 'left'
                                if (tmpValue.value == 'left' || tmpValue.value == 'right' || tmpValue.value == 'center') {
                                    return {'type': valueType.Invalid, 'value': value};
                                } else {
                                    vertical = tmpValue.value;
                                    tmpValue = isBackgroundPositionValue(positions[2]);
                                    // third value must be a length
                                    if (tmpValue && tmpValue.type != valueType.Inherit &&
                                        tmpValue.valueType != valueType.BackgroundPositionKeyword) {
                                        vertical += ' ' + tmpValue.value;
                                        result.push({'horizontal': horizontal, 'vertical': vertical});
                                    } else {
                                        return {'type': valueType.Invalid, 'value': value};
                                    }
                                }
                            } else {
                                // second value is a length
                                horizontal += ' ' + tmpValue.value;
                                tmpValue = isBackgroundPositionValue(positions[2]);
                                // // third value must be keyword and it must be 'center', 'top' or 'bottom'
                                if (tmpValue && tmpValue.type == valueType.BackgroundPositionKeyword &&
                                    (tmpValue.value == 'center'||tmpValue.value=='top'||tmpValue.value=='bottom')) {
                                    result.push({'horizontal': horizontal, 'vertical': tmpValue.value});
                                } else {
                                    return {'type': valueType.Invalid, 'value': value};
                                }
                            }
                        } else {
                            return {'type': valueType.Invalid, 'value': value};
                        }
                    }
                } else {
                    return {'type': valueType.Invalid, 'value': value};
                }
                break;
            case 4:
                tmpValue = isBackgroundPositionValue(positions[0]);
                // the first value must be a keyword and its value must NOT be 'center'
                if (tmpValue && tmpValue.type == valueType.BackgroundPositionKeyword && tmpValue.value != 'center') {
                    if (tmpValue.value == 'left' || tmpValue.value == 'right') {
                        // first value is 'left' or 'right'
                        horizontal = tmpValue.value;
                        tmpValue = isBackgroundPositionValue(positions[1]);
                        // second value must be a length
                        if (tmpValue &&
                            tmpValue.type != valueType.Inherit &&
                            tmpValue.type != valueType.BackgroundPositionKeyword) {
                            horizontal += ' ' + tmpValue.value;
                            tmpValue = isBackgroundPositionValue(positions[2]);
                            // third value must be 'top' or 'bottom'
                            if (tmpValue &&
                                tmpValue.type == valueType.BackgroundPositionKeyword &&
                                (tmpValue.value == 'top' || tmpValue.value == 'bottom')) {
                                vertical = tmpValue.value;
                                tmpValue = isBackgroundPositionValue(positions[3]);
                                // fourth value must be a length
                                if (tmpValue &&
                                    tmpValue.type != valueType.Inherit &&
                                    tmpValue.type != valueType.BackgroundPositionKeyword) {
                                    vertical += ' ' + tmpValue.value;
                                    result.push({'horizontal': horizontal, 'vertical': vertical});
                                } else {
                                    return {'type': valueType.Invalid, 'value': value};
                                }
                            } else {
                                return {'type': valueType.Invalid, 'value': value};
                            }
                        } else {
                            return {'type': valueType.Invalid, 'value': value};
                        }
                    } else {
                        // first value is 'top' or 'bottom'
                        vertical = tmpValue.value;
                        tmpValue = isBackgroundPositionValue(positions[1]);
                        // second value must be a length
                        if (tmpValue &&
                            tmpValue.type != valueType.Inherit &&
                            tmpValue.type != valueType.BackgroundPositionKeyword) {
                            vertical += ' ' + tmpValue.value;
                            tmpValue = isBackgroundPositionValue(positions[2]);
                            // third value must be 'left' or 'right'
                            if (tmpValue &&
                                tmpValue.type == valueType.BackgroundPositionKeyword &&
                                (tmpValue.value == 'left' || tmpValue.value == 'right')) {
                                horizontal = tmpValue.value;
                                tmpValue = isBackgroundPositionValue(positions[3]);
                                // fourth value must be a length
                                if (tmpValue &&
                                    tmpValue.type != valueType.Inherit &&
                                    tmpValue.type != valueType.BackgroundPositionKeyword) {
                                    horizontal += ' ' + tmpValue.value;
                                    result.push({'horizontal': horizontal, 'vertical': vertical});
                                } else {
                                    return {'type': valueType.Invalid, 'value': value};
                                }
                            } else {
                                return {'type': valueType.Invalid, 'value': value};
                            }
                        } else {
                            return {'type': valueType.Invalid, 'value': value};
                        }
                    }
                } else {
                    return {'type': valueType.Invalid, 'value': value};
                }
                break;
            default:
                // error
                return {'type': valueType.Invalid, 'value': value};
            }
        } // for loop
        if (result.length == 0) {
            return {'type': valueType.Invalid, 'value': value};
        }
        return result;
    },
    'box-shadow': function(value) {
        
    },
    'grid-columns': function(value) {
        
    },
    'grid-rows': function(value) {
        
    },
    'transform': function(value) {
        
    },
    'perspective': function(value) {
        
    },
    'perspective-origin': function(value) {
        
    },
    'backface-visibility': function(value) {
        
    }
};

function isColorValue(v) {
    // var basicKeywords = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green','lime', 'maroon',
    //                      'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow'];
    var extendedKeywords = ['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure',
                            'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood',
                            'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan',
                            'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki',
                            'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen',
                            'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet',
                            'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue',
                            'firebrick', 'floralwhite', 'forestgreen', 'fuchsia',
                            'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey',
                            'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki',
                            'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan',
                            'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon','lightseagreen',
                            'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen',
                            'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue',
                            'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin',
                            'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid',
                            'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple',
                            'red', 'rosybrown', 'royalblue',
                            'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue',
                            'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise',
                            'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen'],
        specialKeywords = ['transparent', 'currentColor'],
        rgbRegExp = /^rgb\(((\s*-?\d+\s*,){2}\s*-?\d+\s*|(\s*-?\d+%\s*,){2}\s*-?\d+%\s*)\)$/i,
        rgbaRegExp = /^rgba\(((\s*-?\d+\s*,){3}|(\s*-?\d+%\s*,){3})\s*-?([0-9]+|[0-9]*\.[0-9]+)\s*\)$/i,
        hslRegExp = /^hsl\(\s*-?\d+\s*,\s*-?\d+%\s*,\s*-?\d+%\s*\)$/i,
        hslaRegExp =/^hsla\(\s*-?\d+\s*,(\s*-?\d+%\s*,){2}\s*-?([0-9]+|[0-9]*\.[0-9]+)\s*\)/i
        hexRegExp = /^#([\da-fA-F]{3}|[\da-fA-F]{6})$/;
        
        if (extendedKeywords.indexOf(v.toLowerCase()) != -1 ||
            specialKeywords.indexOf(v.toLowerCase()) != -1 ||
            hexRegExp.test(v) ||
            rgbRegExp.test(v) || rgbaRegExp.test(v) ||
            hslRegExp.test(v) || hslaRegExp.test(v)) {
            return {'type': valueType.Color, 'value': v};
        }
        if (v.toLowerCase() == 'inherit') {
            return {'type': valueType.Inherit, 'value':v};
        }
        return null;
}

function isBorderWidthValue(v) {
    // http://www.w3.org/TR/CSS2/box.html#value-def-border-width
    // Negative value is illegal.
    if (/^-/.test(v)) {
        return null;
    }
    if (relLengthRegExp.test(v)) {
        return {'type': valueType.RelativeLength, 'value': v};
    } else if(absLengthRegExp.test(v) || v == '0') {
        return {'type': valueType.AbsoluteLength, 'value': v};
    } else if(v.toLowerCase() == 'thin' || v.toLowerCase() == 'medium' || v.toLowerCase() == 'thick') {
        return {'type': valueType.BorderWidthKeyword, 'value': v};
    } else if (v.toLowerCase() == 'inherit') {
        return {'type': valueType.Inherit, 'value': v};
    }
    return null;
}

function isBorderStyleValue(v) {
    // http://www.w3.org/TR/CSS2/box.html#border-style-properties
    var styles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
    if (styles.indexOf(v.toLowerCase()) != -1) {
        return {'type': valueType.BorderStyleKeyword, 'value': v};
    }
    if (v.toLowerCase() == 'inherit') {
        return {'type': valueType.Inherit, 'value': v};
    }
    return null;
}

function isBorderRadiusValue(v) {
    // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-radius
    // Negative value is illegal.
    if (/^-/.test(v)) {
        return null;
    }

    if (relLengthRegExp.test(v)) {
        return {'type': valueType.RelativeLength, 'value': v};
    } else if(absLengthRegExp.test(v) || v == '0') {
        return {'type': valueType.AbsoluteLength, 'value': v};
    } else if (v.toLowerCase() == 'inherit') {
        return {'type': valueType.Inherit, 'value': v};
    }
    return null;
}

function isBackgroundImageValue(v) {
    var uriRegExp = /^url\(.+\)$/i,
        imageFuncRegExp = /^image\(.+\)/i,
        gradientRegExp;

    gradientRegExp = [];
    ['^', '^-o-', '^-ms-', '^-moz-', '^-webkit-'].forEach(function(prefix) {
        ['linear-gradient\\(.+\\)$', 'radial-gradient\\(.+\\)$', 'repeating-linear-gradient\\(.+\\)$', 'repeating-radial-gradient\\(.+\\)$'].forEach(function(gradient) {
            gradientRegExp.push(prefix + gradient);
        });
    });
    gradientRegExp = new RegExp(gradientRegExp.join('|'), 'i');

    if (v.toLowerCase() == 'none') {
        return {'type': valueType.None, 'value': v};
    } else if (uriRegExp.test(v)) {
        return {'type': valueType.URI, 'value': v};
    } else if (imageFuncRegExp.test(v)) {
        return {'type': valueType.ImageFunction, 'value': v};
    } else if (gradientRegExp.test(v)) {
        return {'type': valueType.ImageGradient, 'value': v};
    } else if (v.toLowerCase() == 'inherit') {
        return {'type': valueType.Inherit, 'value': v};
    }
    return null;
}

function isBackgroundSizeValue(v) {
    // http://www.w3.org/TR/2012/CR-css3-background-20120724/#ltbg-sizegt
    var keywords;
    // Negative value is illegal.
    if (/^-/.test(v)) {
        return null;
    }

    keywords = ['cover', 'contain'];
    if (keywords.indexOf(v.toLowerCase()) != -1) {
        return {'type': valueType.BackgroundSizeKeyword, 'value': v};
    } else if (absLengthRegExp.test(v) || v == '0') {
        return {'type': valueType.AbsoluteLength, 'value': v};
    } else if (relLengthRegExp.test(v)) {
        return {'type': valueType.RelativeLength, 'value': v};
    } else if (v.toLowerCase() == 'auto') {
        return {'type': valueType.Auto, 'value': v};
    } else if (v.toLowerCase() == 'inherit') {
        return {'type': valueType.Inherit, 'value': v};
    }
    return null;
}

function isBackgroundPositionValue(v) {
    // http://www.w3.org/TR/2012/CR-css3-background-20120724/#ltpositiongt
    var keywords = ['center', 'top', 'right', 'bottom', 'left'];

    if (keywords.indexOf(v.toLowerCase()) != -1) {
        return {'type': valueType.BackgroundPositionKeyword, 'value': v};
    } else if (absLengthRegExp.test(v) || v == '0') {
        return {'type': valueType.AbsoluteLength, 'value': v};
    } else if (relLengthRegExp.test(v)) {
        return {'type': valueType.RelativeLength, 'value': v};
    } else if (v.toLowerCase() == 'inherit') {
        return {'type': valueType.Inherit, 'value': v};
    }
    return null;
}

function isBackgroundRepeatValue(v) {
    // http://www.w3.org/TR/2012/CR-css3-background-20120724/#ltrepeat-stylegt
    var keywords = ['repeat-x', 'repeat-y', 'repeat', 'space', 'round', 'no-repeat'];
    if (keywords.indexOf(v.toLowerCase()) != -1) {
        return {'type': valueType.BackgroundRepeatKeyword, 'value': v};
    } else if (v.toLowerCase() == 'inherit') {
        return {'type': valueType.Inherit, 'value': v};
    }
    return null;
}

function isBackgroundAttachmentValue(v) {
    // http://www.w3.org/TR/2012/CR-css3-background-20120724/#ltattachmentgt
    var keywords = ['scroll', 'fixed', 'local'];
    if (keywords.indexOf(v.toLowerCase()) != -1) {
        return {'type': valueType.BackgroundAttachmentKeyword, 'value': v};
    } else if (v.toLowerCase() == 'inherit') {
        return {'type': valueType.Inherit, 'value': v};
    }
    return null;
}

function isBackgroundBoxValue(v) {
    // http://www.w3.org/TR/2012/CR-css3-background-20120724/#ltboxgt
    var keywords = ['border-box', 'padding-box', 'content-box'];
    if (keywords.indexOf(v.toLowerCase()) != -1) {
        return {'type': valueType.BackgroundBoxKeyword, 'value': v};
    } else if (v.toLowerCase() == 'inherit') {
        return {'type': valueType.Inherit, 'value': v};
    }
    return null;
}

if (module && "exports" in module) {
    module.exports = parser;
}